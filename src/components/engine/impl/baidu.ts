import AbstractEngine, { UrlChanged } from '../abstract-engine'
import AbstractEngineTailer from '../abstract-engine-tailer'
/**
 * Baidu
 * @author zhy
 * @date 20201129
 */
class Baidu extends AbstractEngine {
    key = 'baidu'
    name = '百度'
    prefix = 'www.baidu.com/s?'
    tailer = new Tailer()


    private keywordParam: string = 'wd'

    changeUrl(url: string, badWords: string[]): UrlChanged {
        let needRedirect = false
        let originParam: string = ""
        let newUrl: string = url.split('&').map(param => {
            let [k, v] = param.split('=')
            if (k === this.keywordParam) {
                needRedirect = false
                originParam = v
                let searchWords = v.split('%20') || []
                badWords.map(w => '-' + w)
                    .map(w => encodeURI(w))
                    .filter(w => searchWords.indexOf(w) === -1)
                    .forEach(w => {
                        needRedirect = true // if any filter word does not exsit, set needDirect to true
                        searchWords.push(w)
                    })
                v = searchWords.join("%20")
            }
            return k + "=" + v
        }).reduce((a, b) => a + '&' + b)
        return { newUrl, needRedirect, originParam }
    }

    private static INSTANCE: Baidu

    public static getInstance(): Baidu {
        if (!Baidu.INSTANCE) Baidu.INSTANCE = new Baidu()
        return Baidu.INSTANCE
    }
}

class Tailer extends AbstractEngineTailer {
    inputSelector: '#kw'
    transferParamToWords(param: string): string {
        return param
    }
}

export default Baidu.getInstance()