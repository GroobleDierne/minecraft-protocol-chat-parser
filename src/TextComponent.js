const { ClickEvent, ClickAction } = require('./ClickEvent')
const { HoverEvent, HoverAction } = require('./HoverEvent')
const parseString = require('../index').parseString

class TextComponent {
    #jsonGenerated = false
    #text
    #json
    #extra = []
    /**
     * @type {HoverEvent}
     */
    hoverEvent
    /**
     * @type {ClickEvent}
     */
    clickEvent
    constructor(message = '') {
        this.#text = message;
    }
    get text () {
        return this.#text
    }
    set text (message) {
        this.#jsonGenerated = false
        this.#text = message
    }

    get components () { return this.#extra }

    /**
     * Add a component to the current one
     * @param {TextComponent} component 
     * @returns {Number} index of the component in the array
     */
    addComponent (component) {
        this.#jsonGenerated = false
        return this.#extra.push(component) - 1
    }

    removeComponent (index) {
        this.#extra.splice(index, 1)
        this.#jsonGenerated = false
    }

    /**
     * /!\ If you modify a component make sure to call invalidateCahe() after
     * @param {Number} index of the component to get
     * @returns {TextComponent}
     */
    getComponent(index) {
        return this.#extra[index]
    }
    /**
     * Return the generated JSON & cache the result
     */
    toJSON() {
        if (this.#jsonGenerated) return this.#json

        this.#json = this.#parseComponent(this)
        this.#jsonGenerated = true

        return this.#json
    }

    invalidateCache() {
        this.#jsonGenerated = false
    }

    /**
     * 
     * @param {TextComponent} component to parse
     */
    #parseComponent(component) {
        let json = parseString(component.text)

        if (component.clickEvent) json.clickEvent = {action: component.clickEvent.action, value: component.clickEvent.value}
        if (component.hoverEvent) json.hoverEvent = {action: component.hoverEvent.action, value: component.hoverEvent.value}
        
        component.components.forEach(comp => {
            json.extra.push(this.#parseComponent(comp))
        })

        return json;
    }
}

module.exports = TextComponent