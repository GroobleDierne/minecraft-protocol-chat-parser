const HoverAction = {
    SHOW_TEXT: 'show_text',
    SHOW_ITEM: 'show_item',
    SHOW_ENTITY: 'show_entity'
}

class HoverEvent {
    action;
    value;
    /**
     * 
     * @param {HoverAction} action 
     * @param {Object} value 
     */
    constructor(action, value) {
        this.action = action;
        this.value = value;
    }
}

module.exports = { HoverEvent, HoverAction }