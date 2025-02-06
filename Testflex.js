/**
 * * Inspeciona o uso das propriedades e métodos de um *`namespace`*. Modifica o objeto original, encapsulando propriedades e métodos em novos métodos que monitoram o uso delas e sinaliza qual e quantas vezes foram usadas.
 * * *`FINALIDADE:`* Indentificar métodos ou propriedades declaradas, mas não usadas.
 * 
 * @param {{}} target O objeto alvo. Deve ser um objeto de métodos auxiliares ou tokens.
 */
function observeUsage(targetList = []) {
    targetList.forEach((target) => {
        if (typeof target == "object") {
        const keys = Reflect.ownKeys(target)
        
        /**Armazena a propriedade atual acessada do objeto @type {function | undefined} */
        let prop = undefined
        keys.forEach((k) => {
            prop = target[k]

            // Modificar objeto original.
            // > Encapsular métodos em novos métodos contadores e propriedades em novas propriedades getters contadoras e reatribuir ao objeto original.
            Object.defineProperty(target, k, typeof prop == "function" ?
                // Para métodos.
                {
                    value: (...args) => {
                        console.log("Método " + k + " usado!")
                        return prop(...args)
                    }
                }
                : // Para propriedades.
                {
                    get() {
                        console.log("Propriedade " + k + " acessada!")
                        return prop
                    }
                }
            )
            
        })

    }
    })
}



export default class Testflex {
    /** @typedef {object} InitOptions
     * @prop {Array<{}>} addObserveUsage > Um *array* contendo os objetos que terão o uso de seus métodos e propriedades observados.
    */
    

    /**
     * * Cria um novo teste unitário projetado para atender às nessecidades da biblioteca Flex.js.
     * 
     * @param {InitOptions} init 
     */
    constructor(init = {}) {
        observeUsage(init.addObserveUsage)
    }
}
