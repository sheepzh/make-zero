const setting = require('./components/setting')
const version = require('./components/version')
const button = require('./components/button')
const app = require('./components/app')
const message = require('./components/message')
const contact = require('./components/contact')
const guide = require('./components/guide')
const contextMenu = require('./components/contextMenu')
const vueMessages = {
    en: {
        lang: { name: 'English' },
        setting: setting.en,
        version: version.en,
        button: button.en,
        app: app.en,
        message: message.en,
        contact: contact.en,
        guide: guide.en,
        contextMenu: contextMenu.en
    },
    zh_CN: {
        lang: { name: '简体中文' },
        setting: setting.zh_CN,
        version: version.zh_CN,
        button: button.zh_CN,
        app: app.zh_CN,
        message: message.zh_CN,
        contact: contact.zh_CN,
        guide: guide.zh_CN,
        contextMenu: contextMenu.zh_CN
    }
}

// Genearate the messages used by Chrome
function translate (obj, parentKey = '') {
    const result = {}
    if (typeof obj === 'object') {
        for (const key in obj) {
            const val = obj[key]
            // key of Chrome message
            const messageKey = !!parentKey ? `${parentKey}_${key}` : key
            children = translate(val, messageKey)
            // copy from child
            for (const childKey in children) {
                result[childKey] = children[childKey]
            }
        }
    } else {
        result[parentKey] = {
            message: obj + '',
            description: 'None'
        }
    }
    return result
}
const chromeMessages = {
    // .e.g
    // en: {
    //     "lang.name": {
    //         message: "English",
    //         description: ""
    //     }
    // }
}
for (const localeName in vueMessages) {
    const result = translate(vueMessages[localeName])
    chromeMessages[localeName] = result
}

module.exports = {
    vueMessages,
    chromeMessages,
    defaultLocale: 'zh_CN'
}