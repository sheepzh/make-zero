import IDomCompleteHandler from "../chrome/interface/i-dom-complete-hanler"
import cryptor from './cryptor'
import cryptorConfig from './cryptor-config'

/**
 * Encrypt the <input> and <textarea> tags 
 * 
 * @author zhy
 */
export default class AutoCryptorDomHanlder implements IDomCompleteHandler {

    support(): boolean {
        return true
    }

    handle(): void {
        Array.from(document.getElementsByTagName('input'))
            .filter((input: HTMLInputElement) => ['textarea', 'input'].includes(input.type))
            .forEach((input: HTMLInputElement) => {
                input.onfocus = () => {
                    cryptorConfig
                        .getAutoFill()
                        .then(autoFill => {
                            if (!autoFill) return
                            const val: string = input.value ? input.value.toString() : ""
                            val && cryptor.decrypt(val).then(val => input.value = val)
                        })
                }
                input.onblur = () => {
                    cryptorConfig
                        .getAutoFill()
                        .then(autoFill => {
                            if (!autoFill) return
                            const val: string = input.value ? input.value.toString() : ""
                            val && cryptor.encrypt(val).then(cipher => input.value = cipher)
                        })
                }
            })
    }
}