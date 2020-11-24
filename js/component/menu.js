chrome.contextMenus.create({
    type: 'normal',
    title: 'Zero Encrypt',
    id: 'Zero-encryt',
    contexts: ['all'],
    onclick: () => {
        chrome.tabs.query(
            { currentWindow: true, active: true },
            function (tabs) {
                console.log(tabs[0].id)
                chrome.tabs.sendMessage(tabs[0].id, { tag: 'encrypt' }, res => console.log(res))
            }
        )
    }
}, function () {
    console.log('contextMenus are create.')
})