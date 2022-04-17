const TWITTER_URL = "https://twitter.com/"

const getOpenTwitter = async () => {
  const allTabs = await chrome.tabs.query({})
  const currTab = (await chrome.tabs.query({ currentWindow: true, active: true }))[0]
  console.log(currTab)

  const twitterOpen = allTabs.some((tab) => tab.url.includes(TWITTER_URL))
  const twitterCurr = currTab.url.includes(TWITTER_URL)
  const twitterCurrTab = twitterCurr? currTab: null
  return { twitterOpen, twitterCurr, twitterCurrTab }
}

export { getOpenTwitter }
