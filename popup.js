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

function setEmotionData() {
  // console.log('Setting the emotion data')
  const { twitterOpen, twitterCurrent, twitCurrTab } = getOpenTwitter()
  console.log('Setting the emotion data');


  if (!twitterCurrent) {
    // Twitter's not open, dummy!
    console.log("Twitter isn't open right now!")
    return
  }
}

// getOpenTabs({})

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
  const tweetText = tweetTab.title.substring(tweetTab.title.indexOf("\\\"") + 1, tweetTab.title.length - 10);

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
    }
  };
}

setEmotionData()
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
