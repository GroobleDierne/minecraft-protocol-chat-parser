//Thanks to @jellz for the code I used as an inspiration
//https://github.com/jellz/minecraft-server/blob/rewrite/src/chat/ChatUtil.js
const suppFeature = require('./src/supportFeature')

function loader (protocolVersion) {
    const supportFeature = (feature) => suppFeature(feature, protocolVersion)

    /**
     * 
     * @param {String} message the message to parse
     * @param {boolean} acceptAndChar if set to true, the parser will consider the '&' character as a formatting character
     * @returns {messageExemple} an object ready to be used with node-minecraft-protocol
     * @since 1.0.0
     */
    function parseString(message, acceptAndChar = false) {
        if (message.indexOf('§') === -1 
        && (acceptAndChar === false || message.indexOf('&') === -1)) return { text: message }

        const componentList = [];
        let text = '';
        let nextChanged = false;

        // Default component properties
        let color = 'reset';
        let bold = false;
        let italic = false;
        let underlined = false;
        let strikethrough = false;
        let obfuscated = false;

        function createJsonComponent() {
            if (!text.trim()) return;
            componentList.push({
                text,
                color,
                bold,
                italic,
                underlined,
                strikethrough,
                obfuscated
            });
            text = '';
        };

        while (message !== '') {
            const currentChar = message[0];
            if (nextChanged) {
                const newColor = stringCodes[currentChar];
                if (newColor) {
                    if (newColor === 'bold') bold = true;
                    else if (newColor === 'strikethrough') strikethrough = true;
                    else if (newColor === 'underlined') underlined = true;
                    else if (newColor === 'italic') italic = true;
                    else if (newColor === 'obfuscated') obfuscated = true;
                    else if (newColor === '&') text += '&';
                    else if (newColor === 'reset') {
                        strikethrough = false;
                        bold = false;
                        underlined = false;
                        obfuscated = false;
                        italic = false;
                        color = 'reset';
                    } else color = newColor;
                }
                nextChanged = false;
            } else if (currentChar === '§' || (acceptAndChar && currentChar === '&')) {
                if (nextChanged) {
                    text += '&';
                    nextChanged = false;
                } else {
                    nextChanged = true;
                    createJsonComponent();
                }
            } else {
                text += currentChar;
            }

            message = message.slice(1, message.length);
        }
        createJsonComponent();

        if (componentList.length > 0) {
            return {
                ...componentList[0],
                extra: componentList.slice(1, componentList.length)
            };
        } else return { text: '' };

        
    }

    /**
     * This method accept a JSON object or a JSON like string who can be parsed to JSON using JSON.parse()
     * @param {messageExample|String} the message to parse
     * @returns {String}
     * @since 2.0.0
     */
    function parseJSON(message, useAndChar = false) {

        if (!message.extra) return parseExtra(message, useAndChar)

        let parsedExtra = '';

        for (let extra of message.extra) parsedExtra += parseExtra(extra, useAndChar)

        delete message.extra

        return parseExtra(message, useAndChar)+ parsedExtra;
    }

    /**
     * 
     * @param {extraExample|String} extra the extra to parse
     * @param {Boolean} useAndChar if set to true the format caracter will be "&" and not "§"
     */
    function parseExtra(extra, useAndChar = false) {
        let char = (useAndChar === true ? '&' : '§')

        if (typeof extra === 'string') extra = JSON.parse(extra)

        delete extra.clickEvent
        delete extra.hoverEvent

        let parsedMessage = '';

        for (const key in extra) {
            let value = extra[key];

            if (key === 'text') continue
            if (key === 'color' && value) parsedMessage += (jsonCodes[value] === undefined && supportFeature('supportHexColor')? value : `${char}${jsonCodes[value]}`)

            if (value === true) parsedMessage += `${char}${jsonCodes[key]}`
        }
        return parsedMessage += extra.text
    }

    const TextComponent = require('./src/TextComponent')(parseString)

    return { parseJSON, parseExtra, parseString, TextComponent }
}


const messageExample = {
    text: "",
    extra: [
        {
            text: "",
            color: "",
            bold: false,
            italic: false,
            underlined: false,
            strikethrough: false,
            obfuscated: false

        }
    ]
}
const extraExample = {
    text: "",
    color: "",
    bold: false,
    italic: false,
    underlined: false,
    strikethrough: false,
    obfuscated: false

}

const jsonCodes = {
    'bold': 'l',
    'italic': 'o',
    'underlined': 'n',
    'strikethrough': 'm',
    'obfuscated': 'k',
    'black': '0',
    'dark_blue': '1',
    'dark_green': '2',
    'dark_cyan': '3',
    'dark_red': '4',
    'dark_purple': '5',
    'gold': '6',
    'gray': '7',
    'dark_gray': '8',
    'blue': '9',
    'green': 'a',
    'aqua': 'b',
    'red': 'c',
    'light_purple': 'd',
    'yellow': 'e',
    'white': 'f'
}
const stringCodes = {
    '0': 'black',
    '1': 'dark_blue',
    '2': 'dark_green',
    '3': 'dark_cyan',
    '4': 'dark_red',
    '5': 'dark_purple',
    '6': 'gold',
    '7': 'gray',
    '8': 'dark_gray',
    '9': 'blue',
    'a': 'green',
    'b': 'aqua',
    'c': 'red',
    'd': 'light_purple',
    'e': 'yellow',
    'f': 'white',
    'k': 'obfuscated',
    'l': 'bold',
    'm': 'strikethrough',
    'n': 'underlined',
    'o': 'italic',
    'r': 'reset',
    '&': '&',
    '§': '&'
}
module.exports = loader
module.exports.stringCodes = stringCodes
module.exports.jsonCodes = jsonCodes