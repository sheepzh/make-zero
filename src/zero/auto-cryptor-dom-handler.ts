import IDomCompleteHandler from "../chrome/interface/i-dom-complete-handler"
import cryptoExecutor from '../service/crypto-executor'
import cryptorConfig from '../config'

/**
 * Encrypt the <input> and <textarea> tags 
 * 
 * @author zhy
 */
export default class AutoCryptorDomHandler implements IDomCompleteHandler {

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
                            val && cryptoExecutor.decrypt(val).then(val => input.value = val)
                        })
                }
                input.onblur = () => {
                    cryptorConfig
                        .getAutoFill()
                        .then(autoFill => {
                            if (!autoFill) return
                            const val: string = input.value ? input.value.toString() : ""
                            val && cryptoExecutor.encrypt(val).then(cipher => input.value = cipher)
                        })
                }
            })
    }
}