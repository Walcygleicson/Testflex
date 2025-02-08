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
    inspectUsage: [AUX],
    appID: "testflex-app"
})


AUX.name
AUX.print()
AUX.print()