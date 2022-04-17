const TWITTER_URL = "https://twitter.com/"

const getOpenTwitter = async () => {
  const allTabs = await chrome.tabs.query({})
  const currTab = await chrome.tabs.getCurrent()

  const twitterOpen = allTabs.some((tab) => tab.url.includes(TWITTER_URL))
  const twitterCurr = currTab.includes(TWITTER_URL)
  const twitterCurrTab = twitterCurr? currTab: None
  return { twitterOpen, twitterCurr, twitterCurrTab }
}

export { getOpenTwitter }
