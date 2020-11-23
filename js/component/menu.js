chrome.contextMenus.create({
    type: 'normal',
    title: 'Zero Encrypt',
    id: 'Zero-encryt',
    contexts: ['all'],
    onclick: () => {
        chrome.extension.sendMessage('Zero-encryt', { tag: 'encrypt' }, res => console.log(res))
    }
}, function () {
    console.log('contextMenus are create.')
})