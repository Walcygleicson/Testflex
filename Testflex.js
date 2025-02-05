

class Testflex {
    constructor() {
        
    }
}

Testflex.prototype.usageWatcherOf = (namespace) => {

    if (typeof namespace == "object") {
        const keys = Reflect.ownKeys(namespace)
        console.log(keys)
    }
}
