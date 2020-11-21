const domains = {}

const storage = chrome.storage.sync

chrome.runtime.onInstalled.addListener(function () {
    storage.get('domains', ({ domains }) => {
        buf = domains || {
            "*://www.baidu.com/s?*": {
                name: '百度',
                domain: "www.baidu.com",
                initiators: ["https://www.baidu.com"],
                short: 'baidu'
            },
            "*://www.google.com/search?*": {
                name: "Google",
                domain: "www.google.com",
                short: 'google'
            }
        }

    })
    storage.set({ domains }, function () {
        console.log('Welcome to use search-gater!')
    });
});

// judge filter switches on
async function isOn(initiator) {
    let isOn = undefined
    storage.get('switches', ({ switches }) => {
        const keys = Object.keys(switches)
        for (let index in keys) {
            const key = keys[index]
            const domain = switches[key]
            console.log('dom', domain.on)
            if (domain.initiators && domain.initiators.indexOf(initiator) > -1 && !!domain.on) {
                console.log("dasd")
                isOn = true
                break
            }
        }
    })
    for (let i = 0; i < 10; i++) {
        if (isOn !== undefined) return isOn
        await sleep(200)()
        continue
    }
    return false
}

function switchOnOrOff(domain,onOrOff){
    
}

chrome.webRequest.onBeforeRequest.addListener(function (request) {
    const { method, initiator } = request
    // console.log('isOn', isOn(initiator))
    if (method !== 'GET') return
    const on = await isOn(initiator)
    if (on) return
    console.log(1)
}, { urls }) 