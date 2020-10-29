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
    #hoverEvent
    /**
     * @type {ClickEvent}
     */
    #clickEvent
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
     * @returns {ClickEvent}
     */
    get clickEvent () { return this.#clickEvent }

    set clickEvent (value) {
        this.#clickEvent = value
        this.#jsonGenerated = false
    }

    /**
     * @returns {HoverEvent}
     */
    get hoverEvent () { return this.#hoverEvent }

    set hoverEvent (value) {
        this.#hoverEvent = value
        this.#jsonGenerated = false
    }

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
        if (!this.#jsonGenerated) {
            this.#json = parseString(this.#text)
            if (this.clickEvent) this.#json.clickEvent = {action: this.clickEvent.action, value: this.clickEvent.value}
            if (this.hoverEvent) this.#json.hoverEvent = {action: this.hoverEvent.action, value: this.hoverEvent.value}
        }
        this.#json.extra = []

        this.#extra.forEach(component => {
            this.#json.extra.push(component.toJSON())
        })
        this.#jsonGenerated = true
        return this.#json
    }

    invalidateCache() {
        this.#jsonGenerated = false
    }
}

module.exports = TextComponent