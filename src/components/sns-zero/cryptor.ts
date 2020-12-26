import cryptorConfig from "./cryptor-config"

export default class Cryptor {
    private version: string = '01'
    private prefix: string = 'z' + this.version
    private prefixL: number = this.prefix.length

    encrypt(msg: string) {
        return this.prefix + this.ring(msg)
    }

    decrypt(msg: string) {
        if (msg && msg.startsWith(this.prefix)) {
            return this.ring(msg.substring(this.prefixL))
        } else {
            return msg
        }
    }

    support(cipher: string) {
        return cipher.indexOf(this.prefix) === 0
    }

    /**
     * Ring with XOR
     * 
     * @param msg msg
     */
    private ring(msg: string): string {
        const pn = this.getPasswordNumber()
        return this.toUnicodeArray(msg).map(mn => mn ^ pn).map(cn => String.fromCharCode(cn)).join("")
    }

    /**
     * Translate the password 2 number
     */
    private getPasswordNumber(): number {
        let pn: number = 0
        const psw = cryptorConfig.getPassword()
        this.toUnicodeArray(psw).forEach(n => pn ^= n)
        return pn
    }

    private toUnicodeArray(str: string): Array<number> {
        const result: Array<number> = []
        for (let i = 0; i < str.length; i++) {
            result.push(str.charCodeAt(i))
        }
        return result
    }
}

