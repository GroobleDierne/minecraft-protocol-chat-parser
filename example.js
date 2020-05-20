const parseJSON = require('./index').parseJSON
const parse = require('./index').parse

parse("ddf")

let result = parseJSON({
    text: "Hello ",
    extra: [
        {
            text: "Grooble ",
            color: "black",
            bold: false,
            italic: false,
            underlined: false,
            strikethrough: false,
            obfuscated: false

        },
        {
            text: "How are u ",
            color: "dark_purple",
            bold: false,
            italic: true,
            underlined: true,
            strikethrough: false,
            obfuscated: false

        },
        {
            text: "?",
            color: "yellow",
            bold: true,
            italic: false,
            underlined: false,
            strikethrough: false,
            obfuscated: false

        }
    ]
}, false)

console.log(result);
