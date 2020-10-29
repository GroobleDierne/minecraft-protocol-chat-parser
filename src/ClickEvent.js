const ClickAction = {
    OPEN_URL: 'OPEN_URL',
    RUN_COMMAND: 'RUN_COMMAND',
    SUGGEST_COMMAND: 'SUGGEST_COMMAND',
    CHANGE_PAGE: 'CHANGE_PAGE'
}

class ClickEvent {
    action;
    value;
    /**
     * 
     * @param {ClickAction} action 
     * @param {String} value 
     */
    constructor(action, value) {
        this.action = action;
        this.value = value;
    }
}

module.exports = { ClickEvent, ClickAction }