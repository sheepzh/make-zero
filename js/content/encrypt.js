!(function () {
    const support = ({ tag }) => tag === 'encrypt'

    function consume(data, sender, sendResponse) {
        sendResponse("ok")
    }
    this.ContentChain.add({ support, consume })
})()