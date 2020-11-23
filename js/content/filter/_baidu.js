!(function () {
    let lastKeyword = undefined

    function canHandle(newWord) {
        if (newWord === lastKeyword) {
            return false
        }
        lastKeyword = undefined
        return true
    }

    const support = ({ tag }) => tag === 'search_result'

    function consume({ originWords }, sender, sendResponse) {
        words = decodeURI(originWords)
        if (canHandle(words)) {
            lastKeyword = words
            $('#kw').val(words)
            document.title = words;
        }
        sendResponse("seen")
    }
    this.ContentChain.add({ support, consume })
})()
