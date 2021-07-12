
import { I18nKey as _I18nKey, locale as _locale, t as _t } from "../../../util/i18n"
import { tN as _tN } from '../../../util/i18n/i18n-vue'
import messages, { PopupMessage } from "./message"

const message = messages[_locale]

export type I18nKey = _I18nKey<PopupMessage>

export const t = (key: I18nKey, param?: any) => {
    const props = { key, param }
    return _t<PopupMessage>(message, props)
}

export const tN = (key: I18nKey, param?: any) => {
    const props = { key, param }
    return _tN<PopupMessage>(message, props)
}

export const locale = _locale