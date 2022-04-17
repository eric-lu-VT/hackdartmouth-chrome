import { getOpenTwitter } from './twittertab.js'
import { getSuggestions, getAnalysis } from './suggestions.js'

// Initialize button with users's prefered color
/* let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
}); */


// The body of this function will be executed as a content script inside the
// current page
/* function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
} */
const retrieveTwitterText = () => {
  return [
    "This is the ugliest, nastiest, most appallingly terrible thing I have ever seen",
    "I love rainbows! Roses are so pretty! Everything is great about today :)",
    "Someday everybody you love will die.",
    "I hate politics. It's so divisive and depressing to deal with. I wish it would just end."
  ]
}

function setEmotionData() {
  console.log('Setting the emotion data')
  const { twitterOpen, twitterCurrent, twitCurrTab } = getOpenTwitter()
  console.log('Setting the emotion data')

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

