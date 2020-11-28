!(function () {
    const keywordParam = 'wd'

    /**
     * change the url 
     * @param {String} url  source url
     * @param {Array} badWords words to filter
     * @return { targetUrl:string, needRedirect:boolean } 
     */
    function changeUrl(url, badWords) {
        let needRedirect = false
        let originWords = ""
        let targetUrl = url.split('&').map(param => {
            [k, v] = param.split('=')
            if (k === keywordParam) {
                needRedirect = false
                originWords = v
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
        return { targetUrl, needRedirect, originWords }
    }

    this.Baidu = {
        changeUrl
    }
})()