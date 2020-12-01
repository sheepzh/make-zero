!(function () {
    let switches = {}
    const domains = [
        {
            key: 'baidu',
            name: '百度',
            prefix: "www.baidu.com/s?",
            component: Baidu
        }, {
            key: 'google',
            name: "Google",
            prefix: "www.google.com/search?",
            component: Google
        }
    ]

    const tabKeyWords = {}

    const storage = chrome.storage.sync

    storage.get('switches', ({ switches }) => switches = switches)

    // save to the storage
    const saveSwitches = () => storage.set({ switches }, () => console.log('Save to storage'))

    /**
     * Called while the version is upgraded
     * @param {Array} allKeys keys of the current domain
     */
    function upgrade() {
        const allKeys = domains.map(d => d.key)
        storage.get('switches', (item) => {
            switches = item.switches || {}
            // on by default
            allKeys.forEach(key => switches[key] === undefined && (switches[key] = true))
            saveSwitches()
        })
    }

    /**
     * Change the switch
     * @param {String} key key of domain
     * @param {Boolean} onOrOff true is on, false is off 
     */
    function change(key, onOrOff) {
        switches[key] = onOrOff
        saveSwitches()
    }

    function isOn(key) { return !!switches[key] }

    function domainOf(url) {
        for (let index in domains) {
            const domain = domains[index]
            const { prefix } = domain
            if (prefix && (url.indexOf('https://' + prefix) > -1 || url.indexOf('http://' + prefix) > -1)) {
                return domain
            }
        }
        return undefined
    }

    function tabKeyWord(tabId, keyWord) {
        if (tabKeyWords[tabId] === keyWord) {
            return true
        } else {
            tabKeyWords[tabId] = keyWord
            return false
        }
    }

    function keyWordOf(tabId) {
        return tabKeyWords[tabId]
    }

    function deleteKeyWordOf(tabId) {
        delete tabKeyWords[tabId]
    }

    /**
     * find the domain if need filter
     * 
     * @param {*} request 
     */
    function shouldFilter(domain) {
        if (domain === undefined) return false
        const { key } = domain
        return !!key && Switch.isOn(key)
    }

    this.Switch = { upgrade, change, isOn, shouldFilter, domainOf, domains, tabKeyWord, keyWordOf, deleteKeyWordOf }
})()


chrome.tabs.onUpdated.addListener(function (tabId, { status }, tab) { // listener for tab opens
    let { url } = tab
    const domain = Switch.domainOf(url)
    if (!Switch.shouldFilter(domain)) return

    if (status === 'loading') {
        // when the page is loading (you can do info.status === 'complete' but you will see the page for a second or two)
        const component = domain.component
        if (!component) return
        const badWords = BadWord.listAll()
        if (!badWords || !badWords.length) return
        let { targetUrl, needRedirect, originWords } = component.changeUrl(url, badWords)

        url = targetUrl
        // change the tab url
        if (needRedirect) {
            chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
                !Switch.tabKeyWord(tabId, originWords) && chrome.tabs.update(tabId, { url }, () => { })
            })
        }
    } else if (status === 'complete') {
        const originWords = Switch.keyWordOf(tabId)
        if (!!originWords) {
            Switch.deleteKeyWordOf(tabId)
            chrome.tabs.sendMessage(tabId, { tag: 'search_result', originWords }, res => console.log(res))
        }
    }
})