!(function () {
    let switches = {}

    const storage = chrome.storage.sync

    // save to the storage
    const saveSwitches = () => storage.set({ switches }, () => console.log('Save to storage'))

    /**
     * Called while the version is upgraded
     * @param {Array} allKeys keys of the current domain
     */
    function upgrade(allKeys) {
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

    this.Switch = { upgrade, change, isOn }
})()