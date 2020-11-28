/**
 * Define the action after the search engine redirected
 * @author zhy
 * @date 20201129
 */
export default abstract class AbstractEngineTailer {
    abstract inputSelector: string // the xpath selector of the input box
    abstract transferParamToWords(param: string): string // translate the param to input text

    private lastHandledKeyword: string

    private keywordChanged(newWord: string): boolean {
        if (newWord === this.lastHandledKeyword) {
            return false
        }
        this.lastHandledKeyword = undefined
        return true
    }

    /**
     * Invoke while this redirect url is loaded
     * @param wordParam the origin word param
     */
    public tail(wordParam: string) {
        let words = decodeURI(wordParam)
        words = this.transferParamToWords(words)
        if (this.keywordChanged(words)) {
            this.lastHandledKeyword = words
            $(this.inputSelector).val(words)
            document.title = words;
        }
    }
}