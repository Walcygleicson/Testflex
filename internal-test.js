import Testflex from "./Testflex.js";

const AUX = {
    name: "AUX",
    print(o) {
        console.log(o)
    }
}

AUX.sum = (a, b) => {
    return a + b
}

const test = new Testflex({
    addObserveUsage: [AUX]
})


AUX.name
AUX.print()
AUX.print()