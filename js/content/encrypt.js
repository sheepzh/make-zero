!(function () {
    const support = ({ tag }) => tag === 'encrypt'

    function consume(data, sender, sendResponse) {
        const selection = window.getSelection ?
            window.getSelection()
            : (document.getSelection ? document.getSelection() : (document.selection ? document.selection.createRange().text : "")
            )
        const selectionText = selection.toString()

        alert(Encryptor.decrypt(selectionText))

        sendResponse("ok")
    }
    this.ContentChain.add({ support, consume })
})(window, document)

$(":input").filter('textarea, input').focus(function () {
    if (Encryptor.autoOnOff()) {
        const _this = $(this)
        const val = _this.val()
        if (!!val) {
            _this.val(Encryptor.decrypt(val))
        }
    }
}).blur(function () {
    if (Encryptor.autoOnOff()) {
        const _this = $(this)
        const val = _this.val()
        if (!!val) {
            _this.val(Encryptor.encrypt(val))
        }
    }
})