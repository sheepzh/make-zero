console.log('Using sg')
lastKeyword = ""
wrappedHandler = false

function canHandle(newWord) {
    if (newWord === lastKeyword) {
        return false
    }
    lastKeyword = undefined
    return true
}

chrome.runtime.onMessage.addListener(function ({ originWords }, sender, sendResponse) {
    words = decodeURI(originWords)
    if (canHandle(words)) {
        lastKeyword = words
        $('#kw').val(words)
        document.title = words;
    }
    sendResponse("seen")
})