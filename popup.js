import { TWITTER_URL, getOpenTwitter } from './twittertab.js';
import { analysis, suggestions, getMood } from './suggestions.js';

const retrieveTwitterText = () => {
  return [
    "This is the ugliest, nastiest, most appallingly terrible thing I have ever seen",
    "I love rainbows! Roses are so pretty! Everything is great about today :)",
    "Someday everybody you love will die.",
    "I hate politics. It's so divisive and depressing to deal with. I wish it would just end."
  ]
}

async function readTwitterData() {
  console.log('hi');
  let currTwitter = await getOpenTwitter()
  console.log(currTwitter)
  console.log(currTwitter.twitterCurrTab)

  if (!currTwitter.twitterCurr) {
    // We're not on twitter, dummy!
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
      const sentimentSuggestion = suggestions[mood][parseInt(Math.random() * analysis[mood].length)]
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
      sliderScore.style.background = '#0000ff'
      sliderScore.style.left = 'min( calc(50% - var(--pad)), ' + normScore + '%)'
      sliderScore.style.right = 'min( calc(50% - var(--pad)), ' + normScoreRight + '%)'

      let sliderIntensity = document.getElementById("slider-intensity")
      sliderIntensity.style.right = normIntensity + '%'
      sliderIntensity.style.background = '#00ff00'


      // document.getElementById("data").textContent = "Magnitude: " + data.documentSentiment.magnitude + "; Score: " + data.documentSentiment.score
    }
  };
}

readTwitterData()

/*
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log(message);
  sendResponse({
    data: "Recieved from content script"
  });
  res = message;
});
*/
