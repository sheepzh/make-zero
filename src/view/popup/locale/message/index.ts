/**
 * Used for guide page
 */
import settingMessages, { SettingMessage } from "./setting"
import { Messages } from "../../../../util/i18n"
import versionMessages, { VersionMessage } from "./version"
import buttonMessages, { ButtonMessage } from "../../../../util/i18n/components/button"

export type PopupMessage = {
  version: VersionMessage
  setting: SettingMessage
  button: ButtonMessage
  guide: { menuTitle: string }
}

const _default: Messages<PopupMessage> = {
  en: {
    version: versionMessages.en,
    setting: settingMessages.en,
    button: buttonMessages.en,
    guide: {
      menuTitle: 'Guidebook'
    }
  },
  zh_CN: {
    version: versionMessages.zh_CN,
    setting: settingMessages.zh_CN,
    button: buttonMessages.zh_CN,
    guide: {
      menuTitle: '使用指南'
    }
  }
}

export default _default