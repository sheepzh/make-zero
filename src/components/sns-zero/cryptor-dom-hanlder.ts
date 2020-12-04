import IDomCompleteHandler from "../../chrome/interface/i-dom-complete-hanler";
import Cryptor from './cryptor';
import cryptorConfig from './cryptor-config';
import $ = require('jquery')

export default class CryptorDomHanlder implements IDomCompleteHandler {

    private cryptor: Cryptor = new Cryptor()

    support(): boolean {
        return cryptorConfig.getAutoFill()
    }

    handle(): void {
        const _cryptor = this.cryptor
        $(":input").filter('textarea, input').focus(function () {
            const _this = $(this)
            const val: string = _this.val() ? _this.val().toString() : ""
            val && _this.val(_cryptor.decrypt(val.toString()))
        }).blur(function () {
            const _this = $(this)
            const val: string = _this.val() ? _this.val().toString() : ""
            val && _this.val(_cryptor.encrypt(val))
        })
    }
}