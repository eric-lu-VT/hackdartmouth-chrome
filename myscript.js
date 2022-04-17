chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    /*
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
                */
    if (request.greeting === "hello") {
      res = document.getElementsByClassName("css-1dbjc4n r-1s2bzr4")[0].innerText;
      // console.log(res);
      sendResponse({message: res});
    }
  }
);