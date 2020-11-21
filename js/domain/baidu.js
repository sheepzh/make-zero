!(function () {
    const keywordParam = 'wd'

    /**
     * change the url 
     * @param {sourceUrl} url 
     * @param {words to filter} badWords
     * @return { targetUrl:string, needRedirect:boolean } 
     */
    function changeUrl(url, badWords) {
        let needRedirect = false
        let targetUrl = url.split('&').map(param => {
            [k, v] = param.split('=')
            if (k === keywordParam) {
                needRedirect = false
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
        return { targetUrl, needRedirect }
    }

    this.Baidu = {
        changeUrl
    }
})()