import AbstractEngine, { UrlChanged } from "../abstract-engine"
import AbstractEngineTailer from '../abstract-engine-tailer'

/**
 * Google
 * @author zhy
 * @date 20201129
 */
class Google extends AbstractEngine {
    key = 'google'
    name = 'Google'
    prefix = 'www.google.com/search?'
    tailer = new Tailer()

    private keywordParam: string = 'q'

    changeUrl(url: string, badWords: string[]): UrlChanged {
        let needRedirect = false
        let originParam = ""
        let newUrl = url.split('&').map(param => {
            let [k, v] = param.split('=')
            if (k === this.keywordParam) {
                needRedirect = false
                originParam = v
                let searchWords = v.split('+') || []
                badWords.map(w => '-' + w)
                    .map(w => encodeURI(w))
                    .filter(w => searchWords.indexOf(w) === -1)
                    .forEach(w => {
                        needRedirect = true // if any filter word does not exsit, set needDirect to true
                        searchWords.push(w)
                    })
                v = searchWords.join("+")
            }
            return k + "=" + v
        }).reduce((a, b) => a + '&' + b)
        return { newUrl, needRedirect, originParam }
    }

    private static INSTANCE: Google

    public static getInstance(): Google {
        if (!Google.INSTANCE) Google.INSTANCE = new Google()
        return Google.INSTANCE
    }
}

class Tailer extends AbstractEngineTailer {
    inputSelector() { return '.gLFyf.gsfi' }
    transferParamToWords(param: string): string {
        return param.replace('+', ' ')
    }
}

export default Google.getInstance()