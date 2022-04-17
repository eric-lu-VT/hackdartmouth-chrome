import { getOpenTwitter } from './twittertab.js';
import { getSuggestions, getAnalysis } from './suggestions.js';

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

  // get the text from the twitter page
  const twitterText = retrieveTwitterText()
  // score the retrieved text
  const average = twitterText.reduce((prev, cur) => prev + cur, 0) / twitterText.length
  const magnitude = twitterText.reduce((prev, cur) => prev + Math.abs(cur), 0) / twitterText.length
  // Generate some text to display
  // display the text and the bars
}

// getOpenTabs({})
setEmotionData()

console.log('hi');
var res = (await chrome.tabs.query({ currentWindow: true, active: true }))[0].title;
res = res.substring(res.indexOf("\"") + 1, res.length - 10);

console.log(res);

var xhr = new XMLHttpRequest();
xhr.open("POST", "https://language.googleapis.com/v1beta2/documents:analyzeSentiment?key=AIzaSyA_WiRQpF3lpstDd1v8Sm1kgLyyuEVcqnY", true);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send(JSON.stringify({
  "document": {
    "type": "PLAIN_TEXT",
    "content": res
  },
  "encodingType": "UTF16"
}));

xhr.onreadystatechange = function () {
  if (this.readyState != 4) return;

  if (this.status == 200) {
    var data = JSON.parse(this.responseText);
    console.log("Magnitude: " + data.documentSentiment.magnitude);
    console.log("Score: " + data.documentSentiment.score);
    document.getElementById("data").textContent = "Magnitude: " + data.documentSentiment.magnitude + "; Score: " + data.documentSentiment.score
  }
};

/*
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log(message);
  sendResponse({
    data: "Recieved from content script"
  }); 
  res = message;
});
*/