import { Messages } from ".."
import msgMessages, { MsgMessage } from "../components/message"
import appMessages, { AppMessage } from "../components/app"
import contextMenuMessages, { ContextMenuMessage } from "../components/context-menus"
import buttonMessages, { ButtonMessage } from "../components/button"

export type ChromeMessage = {
    app: AppMessage
    message: MsgMessage
    button: ButtonMessage
    contextMenu: ContextMenuMessage
}

const messages: Messages<ChromeMessage> = {
    zh_CN: {
        app: appMessages.zh_CN,
        message: msgMessages.zh_CN,
        contextMenu: contextMenuMessages.zh_CN,
        button: buttonMessages.zh_CN
    },
    en: {
        app: appMessages.en,
        message: msgMessages.en,
        contextMenu: contextMenuMessages.en,
        button: buttonMessages.en
    }
}

export default messages

const placeholder: ChromeMessage = {
    app: {
        name: '',
        description: ''
    },
    message: {
        unsupportedWeiboDecAuto: "",
        encryptionSuccess: "",
        encryptionFail: "",
        unknownCipherText: "",
        decryptionResult: "",
        decryptionCopied: "",
        decryptionCopyFailed: "",
    },
    contextMenu: {
        encrypt: '',
        decrypt: ''
    },
    button: {
        copy: '',
        cancel: '',
        copied: '',
        dbclick: ''
    }
}

function routerPath(root: any, parentPath = undefined) {
    Object.entries(root)
        .forEach(([key, value]) => {
            const currentPath = parentPath ? `${parentPath}_${key}` : key
            if (typeof value === 'string') {
                root[key] = currentPath
            } else {
                root[key] = routerPath(value, currentPath)
            }
        })
    return root
}

export const router: ChromeMessage = routerPath(placeholder) as unknown as ChromeMessage
