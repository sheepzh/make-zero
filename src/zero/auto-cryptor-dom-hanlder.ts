import IDomCompleteHandler from "../chrome/interface/i-dom-complete-hanler"
import cryptionExcutor from '../service/cryption-excutor'
import cryptorConfig from '../config'

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
                            val && cryptionExcutor.decrypt(val).then(val => input.value = val)
                        })
                }
                input.onblur = () => {
                    cryptorConfig
                        .getAutoFill()
                        .then(autoFill => {
                            if (!autoFill) return
                            const val: string = input.value ? input.value.toString() : ""
                            val && cryptionExcutor.encrypt(val).then(cipher => input.value = cipher)
                        })
                }
            })
    }
}