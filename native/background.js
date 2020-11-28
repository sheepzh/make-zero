
chrome.runtime.onInstalled.addListener(() => {
    Switch.upgrade()
    Encryptor.onInstalled()
})
