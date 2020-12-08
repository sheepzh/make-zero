import asyncStorage from "../../chrome/common/async-storage"

/**
 * Dictionary of the bad words
 * @author zhy
 * @date 2020/11/28
 * @since 1.0.0
 */
class BadWordDictionary {
    private static INSTANCE: BadWordDictionary
    private static KEY = '__bad_words__'

    private words: string[] = []

    private static DEMO = ['csdn']

    private constructor() {
        this.getWords((data: any) => this.words = data)
    }

    public static getInstance(): BadWordDictionary {
        if (!BadWordDictionary.INSTANCE)
            BadWordDictionary.INSTANCE = new BadWordDictionary()
        return BadWordDictionary.INSTANCE
    }

    /**
     * @return all bad words
     */
    public allWords(callback: Function) {
        this.getWords(callback)
    }

    /**
     * Remove the target word from the dictionary
     * @param word2Remove this word
     */
    public remove(word2Remove: string) {
        const index = this.words.indexOf(word2Remove)
        if (index !== -1) this.words.splice(index, 1)
        this.save()
    }

    /**
     * Add the word into this dictionary
     * @param word2Add the target word
     */
    public add(word2Add: string) {
        const index = this.words.indexOf(word2Add)
        if (index === -1) this.words.push(word2Add)
        this.save()
    }

    private save() {
        asyncStorage.setAsync(BadWordDictionary.KEY, this.words)
    }

    private getWords(callback: Function) {
        asyncStorage.getAsync(BadWordDictionary.KEY, (data: any) => callback && callback(data || BadWordDictionary.DEMO))
    }
}

export default BadWordDictionary.getInstance()