import app, { AppMessage } from "./components/app"
import button, { ButtonMessage } from "./components/button"
import contextMenu, { ContextMenuMessage } from "./components/contextMenu"
import guide, { GuideMessage } from "./components/guide"
import message, { MsgMessage } from "./components/message"
import setting, { SettingMessage } from "./components/setting"
import version, { VersionMessage } from "./components/version"
import { Messages } from "./constant"

type I18nMessage = {
    lang: { name: string }
    setting: SettingMessage
    version: VersionMessage
    button: ButtonMessage
    app: AppMessage
    message: MsgMessage
    guide: GuideMessage
    contextMenu: ContextMenuMessage
}

const messages: Messages<I18nMessage> = {
    en: {
        lang: { name: 'English' },
        setting: setting.en,
        version: version.en,
        button: button.en,
        app: app.en,
        message: message.en,
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
        guide: guide.zh_CN,
        contextMenu: contextMenu.zh_CN
    }
}

export default messages

// Used for export json file of chrome 
// @see [project-path]/webpack/plugins/generate-locale-for-chrome.js
// And this can be auto injected via this plugin in the future
const globalAny: any = global
globalAny.exportsToChrome = messages