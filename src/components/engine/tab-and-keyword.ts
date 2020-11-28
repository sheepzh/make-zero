/**
 * Store the keywords of the tab, to keep other tabs change with the target search tab
 * @author zhy
 * @date 20201129
 */
class TabAndKeyword {
    private static INSTANCE: TabAndKeyword

    private dict: { [key: number]: string; } = {}
    private constructor() {
        this.dict = {}
    }

    public static getInstance(): TabAndKeyword {
        if (!TabAndKeyword.INSTANCE) TabAndKeyword.INSTANCE = new TabAndKeyword()
        return TabAndKeyword.INSTANCE
    }

    /**
     * Store the keywords of the target tab
     * @param tabId id of the tab
     * @param originWords current search words
     * @return true if the previous is the same as the target words, or false
     */
    public storeWords(tabId: number, words: string): boolean {
        if (this.dict[tabId] === words) {
            return true
        } else {
            this.dict[tabId] = words
            return false
        }
    }

    get(tabId: number): string {
        return this.dict[tabId]
    }

    delete(tabId: number) {
        delete this.dict[tabId]
    }
}

export default TabAndKeyword.getInstance()