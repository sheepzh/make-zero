lastKeyword = undefined
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
    words = words.replace('+', ' ')
    console.log(words)
    if (canHandle(words)) {
        lastKeyword = words
        $('.gLFyf.gsfi').val(words)
        document.title = words;
    }
    sendResponse("seen")
})