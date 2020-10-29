const { parseJSON, parseString, parseExtra } = require('./index')(735/*735 is the 1.16 protocol number*/)// for your usage change "./index" to "minecraft-protocol-chat-parser"

console.log(parseString("§eHello §kWorld"))
// output
// {
//     text: 'Hello ',
//     color: 'yellow',
//     bold: false,
//     italic: false,
//     underlined: false,
//     strikethrough: false,
//     obfuscated: false
//     extra: [
//         {
//             text: 'World',
//             color: 'yellow',
//             bold: false,
//             italic: false,
//             underlined: false,
//             strikethrough: false,
//             obfuscated: true
//         }
//     ]
// }

let parsed = parseJSON({
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
})

console.log(parsed); //Hello §0Grooble §5§o§nHow are u §e§l?

let parsedExtra = parseExtra({
    text: "I'm an extra",
    color: "green",
    bold: false,
    italic: false,
    underlined: true,
    strikethrough: false,
    obfuscated: false

})

console.log(parsedExtra); //§a§nI'm an extra

parsedExtra = parseExtra(`{
    "text": "I'm a JSON like String",
    "color": "white",
    "bold": false,
    "italic": false,
    "underlined": false,
    "strikethrough": false,
    "obfuscated": false

}`, true)// when set to true replace "§" by "&" in the result

console.log(parsedExtra); //&fI'm a JSON like String

parsedExtra = parseExtra({
    text: "Team...Team...Team... I like this word !",
    color: "blue",
    bold: false,
    italic: true,
    underlined: false,
    strikethrough: false,
    obfuscated: false

}, true)

console.log(parsedExtra); //&9&oTeam...Team...Team... I like this word !

let noExtraMsg = parseJSON({
        text: "With 0 extra & only some properties",
        color: "dark_red",
        underlined: true
})

console.log(noExtraMsg); //§4§nWith 0 extra & only some properties
