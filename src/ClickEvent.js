const ClickAction = {
    OPEN_URL: 'open_url',
    RUN_COMMAND: 'run_command',
    SUGGEST_COMMAND: 'suggest_command',
    CHANGE_PAGE: 'change_page'
}

class ClickEvent {
    action;
    value;
    /**
     * 
     * @param {ClickAction} action 
     * @param {Object} value 
     */
    constructor(action, value) {
        this.action = action;
        this.value = value;
    }
}

module.exports = { ClickEvent, ClickAction }