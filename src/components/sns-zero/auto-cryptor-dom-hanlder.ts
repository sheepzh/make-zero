import IDomCompleteHandler from "../../chrome/interface/i-dom-complete-hanler";
import Cryptor from './cryptor';
import cryptorConfig from './cryptor-config';
import $ = require('jquery')

/**
 * Encrypt the <input> and <textarea> tags 
 * @author zhy
 */
export default class AutoCryptorDomHanlder implements IDomCompleteHandler {

    private cryptor: Cryptor = new Cryptor()

    support(): boolean {
        return cryptorConfig.getAutoFill()
    }

    handle(): void {
        const _cryptor = this.cryptor
        $(":input").filter('textarea, input').on('focus', function () {
            const _this = $(this)
            const val: string = _this.val() ? _this.val().toString() : ""
            val && _this.val(_cryptor.decrypt(val.toString()))
        }).on('blur', function () {
            const _this = $(this)
            const val: string = _this.val() ? _this.val().toString() : ""
            val && _this.val(_cryptor.encrypt(val))
        })
    }
}