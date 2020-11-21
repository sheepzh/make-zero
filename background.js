let badWords = ['csdn', '博客園']

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
    }
]

const urls = domains.map(domain => domain.pattern)

function getDomains() { return domains }

chrome.runtime.onInstalled.addListener(() => Switch.upgrade(domains.map(d => d.key)))

function getDomainOf(url) {
    for (let index in domains) {
        const domain = domains[index]
        const { prefix } = domain
        if (prefix && (url.indexOf('https://' + prefix) > -1 || url.indexOf('http://' + prefix) > -1)) {
            return domain
        }
    }
    return undefined
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

chrome.tabs.onUpdated.addListener(function (tabId, { status }, tab) { // listener for tab opens
    if (status !== 'loading') return
    // when the page is loading (you can do info.status === 'complete' but you will see the page for a second or two)
    let { url } = tab
    const domain = getDomainOf(url)

    if (shouldFilter(domain)) {
        const component = domain.component
        if (!component) return
        let { targetUrl, needRedirect } = component.changeUrl(url, badWords)
        url = targetUrl
        if (needRedirect) {
            chrome.tabs.query({ // change the tab url
                currentWindow: true,
                active: true
            }, function (tab) {
                chrome.tabs.update(tab.id, { url });
            });
        }
    }
})