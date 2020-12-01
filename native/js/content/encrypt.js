!(function () {
    const support = ({ tag }) => tag === 'encrypt'

    // function copyText(text){
    //     var textarea = document.createElement("textarea");
    //     var currentFocus = document.activeElement;
    //     document.body.appendChild(textarea);
    //     textarea.value = text;
    //     textarea.focus();
    //     if (textarea.setSelectionRange){textarea.setSelectionRange(0, textarea.value.length);}
    //     else {textarea.select();}
    //     try {var state = document.execCommand("copy");}
    //     catch(err){var state = false;}
    //     document.body.removeChild(textarea);
    //     currentFocus.focus();
    //     return state;
    // }

    function consume({ enOrD }, sender, sendResponse) {
        const selection = window.getSelection ?
            window.getSelection()
            : (document.getSelection ? document.getSelection() : (document.selection ? document.selection.createRange().text : "")
            )
        const selectionText = selection.toString()

        if (enOrD) {
            const txt = Encryptor.encrypt(selectionText)
            // copyText(txt)
            alert(txt)
        } else {
            alert(Encryptor.decrypt(selectionText))
        }

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