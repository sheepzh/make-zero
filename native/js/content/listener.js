chrome.runtime.onMessage.addListener(function (data, sender, sendResponse) {
    this.ContentChain.consume(data, sender, sendResponse)
})