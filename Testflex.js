"use strict"
// #region [STYLES] -------------------------------------------------
/** * Armazena referências de elementos e folhas de estilos que serão aplicadas a estes elementos. */
const STYLE = {
    /** * Recebe referências dos elementos que devem adquirir as folhas de estilos definidas abaixo. @type {ElementsRefs} */
    "@targets": {},

    /**
     * * Apenas adiciona um elemento como referência para receber folhas de estilos declaras em *`STYLE`*. Retorna o elemento referenciado.
     * 
     * @param {string} key A chave correspondente a uma folha de estilo declarada.
     * @param {HTMLElement} target O elemento alvo.
     */
    append(key, target) {
        if (typeof key === "string" && (target instanceof HTMLElement)) {
            return STYLE["@targets"][key] = target
        }
    },

    // [FOLHAS DE STILOS]
    app:
    `
    html * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        background:gray;
    }   
    `,
    inspectContainer:
    `
    #inspect-container {
        border:1px solid red;
        padding: 2px 1em;
    }
    `
}
// #endregion ------------------------------------------------------

// #region [FUNÇÕES AUXILIARES INTERNAS] ---------------------------


/**
 * * Inspeciona o uso das propriedades e métodos de um *`namespace`*. Modifica o objeto original, encapsulando propriedades e métodos em novos métodos que monitoram o uso delas e sinaliza qual e quantas vezes foram usadas.
 * * *`FINALIDADE:`* Indentificar métodos ou propriedades declaradas, mas não usadas.
 * 
 * @param {Array<{}>} targetList O objeto alvo. Deve ser um objeto de métodos auxiliares ou tokens.
 * 
 * @param {HTMLElement} app O elemento app. 
 */
function setInspectUsage(targetList = [], app) {
    // Definir elemento pai para mostrar resultados das inspeções.
    if (targetList.length > 0 && (app instanceof HTMLElement)) {
        const inspectContainer = STYLE.append("inspectContainer", document.createElement("div"))
        inspectContainer.id = "inspect-container"


        // Inserir elemento no app
        app.appendChild(inspectContainer) 
    }


    // Iterar objetos alvos da inspeção.
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

/** * Define uma folha de estilo para um elemento
 * @param {HTMLElement} target O elemento alvo.
 * @param {string} styleString Uma string que represente os estilos a serem aplicados.
 */
function insertSTYLES() {
    const STYLETargets = STYLE["@targets"]
    
    // Iterar sobre os estilos definidos em STYLE
    for (let sheetKey in STYLE) {
        if (sheetKey in STYLETargets) {
            const target = STYLETargets[sheetKey]
            const style = document.createElement("style")
            style.textContent = STYLE[sheetKey]
            target.appendChild(style)
            
        }
    }
}


// #endregion ----------------------------------------------------------


// CLASSE DE EXPORTAÇÃO >>>>>>>
export default class Testflex {
    /** @typedef {object} InitOptions
     * @prop {Array<{}>} inspectUsage > Adiciona um *`inspecionador de uso`* das propriedades de um objeto.
     * 
     * @prop {string} appID
    */
    

    /**
     * * Cria um novo teste unitário projetado para atender às nessecidades da biblioteca Flex.js.
     * 
     * @param {InitOptions} init 
     */
    constructor(init = {}) {
        /** Recebe o elemento HTML onde será montado a tabela de resultados dos testes. */
        this.app =  document.getElementById(init.appID)

        // Adicionar inspetores para objetos.
        setInspectUsage(init.inspectUsage, this.app)

        // Executar inserção de folhas de estilos declaradas em STYLE.
        insertSTYLES()

    }

    
}

// #region [STYPEDEF] -----------------------

/**
 * @typedef {Object<string, HTMLElement} ElementsRefs
 * 
 */

// #endregion ----------------------------------
