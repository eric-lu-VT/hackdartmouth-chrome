import { TWITTER_URL, getOpenTwitter } from './twittertab.js';
import { analysis, suggestions, getMood } from './suggestions.js';
import { mix } from './color.js'

async function readTwitterData() {
  let currTwitter = await getOpenTwitter()
  console.log(currTwitter)
  console.log(currTwitter.twitterCurrTab)

  if (!currTwitter.twitterCurr) {
    // We're not on twitter, dummy!
    document.getElementById("sentiment-analysis-text").innerText = analysis['invalid'][parseInt(Math.random() * analysis['invalid'].length)]
    document.getElementById("sentiment-suggestion-text").innerText = suggestions['invalid'][parseInt(Math.random() * suggestions['invalid'].length)]
    document.getElementById("sentiment-data").innerHTML = ""

    console.log('not on twitter')
    return
  }

  const tweetTab = currTwitter.twitterCurrTab
  console.log(tweetTab.title)
  const tweetText = tweetTab.title.substring(tweetTab.title.indexOf("\"") + 1, tweetTab.title.length - 11);

  console.log(tweetText);

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "https://language.googleapis.com/v1beta2/documents:analyzeSentiment?key=AIzaSyA_WiRQpF3lpstDd1v8Sm1kgLyyuEVcqnY", true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
    "document": {
      "type": "PLAIN_TEXT",
      "content": tweetText
    },
    "encodingType": "UTF16"
  }));

  xhr.onreadystatechange = function () {
    if (this.readyState != 4) return;

    if (this.status == 200) {
      const data = JSON.parse(this.responseText)
      const documentSentiment = data.documentSentiment

      /* console.log("Score: " + data.documentSentiment.score);
      console.log("Magnitude: " + data.documentSentiment.magnitude); */

      const mood = getMood(documentSentiment.score, documentSentiment.magnitude)
      const sentimentAnalysis = analysis[mood][parseInt(Math.random() * analysis[mood].length)]
      const sentimentSuggestion = suggestions[mood][parseInt(Math.random() * suggestions[mood].length)]
      console.log(sentimentAnalysis)
      console.log(sentimentSuggestion)

      // HTML manipulation
      document.getElementById("sentiment-analysis-text").innerText = sentimentAnalysis
      document.getElementById("sentiment-suggestion-text").innerText = sentimentSuggestion

      const normScore = (documentSentiment.score + 1) * 50
      const normScoreRight = 100 - normScore
      const normIntensity = (1 - documentSentiment.magnitude) * 100
      // CSS manipulation
      let sliderScore = document.getElementById("slider-average")
      sliderScore.style.background = 'color-mix(in srgb, ' + '#00ff00 ' + normScore + '%, ' + '#ff0000' + ')'
      sliderScore.style.left = 'min( calc(50% - var(--pad)), ' + normScore + '%)'
      sliderScore.style.right = 'min( calc(50% - var(--pad)), ' + normScoreRight + '%)'
      console.log(sliderScore.style.background)

      let sliderIntensity = document.getElementById("slider-intensity")
      sliderIntensity.style.background = 'color-mix(in srgb, #ff0000' + normIntensity + '%, #00ff00)'
      sliderIntensity.style.right = normIntensity + '%'


      // document.getElementById("data").textContent = "Magnitude: " + data.documentSentiment.magnitude + "; Score: " + data.documentSentiment.score
    }
  };
}

readTwitterData()

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
    console.log(response.message);

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "https://language.googleapis.com/v1beta2/documents:analyzeSentiment?key=AIzaSyA_WiRQpF3lpstDd1v8Sm1kgLyyuEVcqnY", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
      "document": {
        "type": "PLAIN_TEXT",
        "content": response.message
      },
      "encodingType": "UTF16"
    }));

    xhr.onreadystatechange = function () {
      if (this.readyState != 4) return;

      if (this.status == 200) {
        let data = JSON.parse(this.responseText);
        console.log("Magnitude: " + data.documentSentiment.magnitude);
        console.log("Score: " + data.documentSentiment.score);

        const mood = getMood(data.documentSentiment.score, data.documentSentiment.magnitude)
        console.log(mood)
        const sentimentAnalysis = analysis[mood][Math.random() * analysis[mood].length]
        const sentimentSuggestion = suggestions[mood][Math.random() * analysis[mood].length]
        console.log(sentimentAnalysis)
        console.log(sentimentSuggestion)

        document.getElementById("data").textContent = "Magnitude: " + data.documentSentiment.magnitude + "; Score: " + data.documentSentiment.score
        console.log('reached the end');
      }
    };
  });
});
