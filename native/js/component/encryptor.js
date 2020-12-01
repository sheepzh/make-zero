!(function () {
    const version = '01'
    const prefix = 'ZERO' + version
    let settings = { key: "", auto: false }
    const storage = chrome.storage.sync
    const OPTION = {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    }

    const des = CryptoJS.DES

    storage.get('encryptor', ({ encryptor }) => settings = encryptor || {})

    function keyHex() {
        const key = settings.key || "zero"
        return CryptoJS.enc.Utf8.parse(key)
    }

    function decrypt(str) {
        const origin = str.substring(prefix.length)
        const decrypted = des.decrypt({
            ciphertext: CryptoJS.enc.Base64.parse(origin)
        }, keyHex(), OPTION)
        return decrypted.toString(CryptoJS.enc.Utf8)
    }

    function encrypt(str) {
        const encrypted = des.encrypt(str, keyHex(), OPTION)
        const origin = encrypted.ciphertext.toString(CryptoJS.enc.Base64)
        return prefix + origin
    }

    const save = () => storage.set({ encryptor: settings }, () => console.log('Save key to storage'))


    function onInstalled() {
        storage.get('encryptor', ({ encryptor }) => {
            settings = encryptor || {}
            !settings.key && key('123456')
        })
    }

    function key(key) {
        if (!!key) settings.key = key
        save()
        return settings.key
    }

    function auto(onOff) {
        settings.auto = onOff
        save()
    }

    const autoOnOff = () => !!settings.auto

    this.Encryptor = {
        onInstalled,
        encrypt,
        decrypt,
        key,
        auto,
        autoOnOff
    }
})()