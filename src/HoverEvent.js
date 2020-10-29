const HoverAction = {
    SHOW_TEXT: 'SHOW_TEXT',
    SHOW_ITEM: 'SHOW_ITEM',
    SHOW_ENTITY: 'SHOW_ENTITY'
}

class HoverEvent {
    action;
    value;
    constructor(action, value) {
        this.action = action;
        this.value = value;
    }
}

module.exports = { HoverEvent, HoverAction }