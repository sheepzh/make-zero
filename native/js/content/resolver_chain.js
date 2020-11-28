!(function () {
    const scripts = []
    function add(resolver) {
        const { consume, support } = resolver
        if (!consume || !support) {
            throw new Error("new consume  or support function")
        }
        scripts.push(resolver)
    }

    function consume(data, sender, sendResponse) {
        scripts.forEach(script => script.support(data) && script.consume(data, sender, sendResponse))
    }

    this.ContentChain = {
        add, consume
    }
})()