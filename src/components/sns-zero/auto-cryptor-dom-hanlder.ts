import IDomCompleteHandler from "../../chrome/interface/i-dom-complete-hanler";
import cryptor from './cryptor';
import cryptorConfig from './cryptor-config';
import $ = require('jquery')

/**
 * Encrypt the <input> and <textarea> tags 
 * @author zhy
 */
export default class AutoCryptorDomHanlder implements IDomCompleteHandler {

    support(): boolean {
        return cryptorConfig.getAutoFill()
    }

    handle(): void {

        $(":input").filter('textarea, input').on('focus', function () {
            const _this = $(this)
            const val: string = _this.val() ? _this.val().toString() : ""
            val && _this.val(cryptor.decrypt(val.toString()))
        }).on('blur', function () {
            const _this = $(this)
            const val: string = _this.val() ? _this.val().toString() : ""
            val && _this.val(cryptor.encrypt(val))
        })
    }
}