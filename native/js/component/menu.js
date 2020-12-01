chrome.contextMenus.create({
    type: 'normal',
    title: '解码',
    id: 'Zero-encryt',
    contexts: ['all'],
    onclick: () => {
        chrome.tabs.query(
            { currentWindow: true, active: true },
            function (tabs) {
                console.log(tabs[0].id)
                chrome.tabs.sendMessage(tabs[0].id, { tag: 'encrypt', enOrD: false }, res => console.log(res))
            }
        )
    }
}, function () {
    console.log('contextMenus are create.')
})

chrome.contextMenus.create({
    type: 'normal',
    title: '加码',
    id: 'Zero-decrypt',
    contexts: ['all'],
    onclick: () => {
        chrome.tabs.query(
            { currentWindow: true, active: true },
            function (tabs) {
                console.log(tabs[0].id)
                chrome.tabs.sendMessage(tabs[0].id, { tag: 'encrypt', enOrD: true }, res => console.log(res))
            }
        )
    }
}, function () {
    console.log('contextMenus are create.')
})