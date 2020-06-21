const parseJSON = require('./index').parseJSON // for your usage change "./index" to "minecraft-protocol-chat-parser"
const parseString = require('./index').parseString
const parseExtra = require('./index').parseExtra

console.log(parseString("§eHello §kWorld"))
// output
// {
//     text: '',
//         extra: [
//             {
//                 text: 'Hello ',
//                 color: 'yellow',
//                 bold: false,
//                 italic: false,
//                 underlined: false,
//                 strikethrough: false,
//                 obfuscated: false
//             },
//             {
//                 text: 'World',
//                 color: 'yellow',
//                 bold: false,
//                 italic: false,
//                 underlined: false,
//                 strikethrough: false,
//                 obfuscated: true
//             }
//         ]
// }

console.log(parseString("&5I'm §6a &asimple §bmessage", true));
// output
// {
//   text: '',
//   extra: [
//     {
//       text: "I'm ",
//       color: 'dark_purple',
//       bold: false,
//       italic: false,
//       underlined: false,
//       strikethrough: false,
//       obfuscated: false
//     },
//     {
//       text: 'a ',
//       color: 'gold',
//       bold: false,
//       italic: false,
//       underlined: false,
//       strikethrough: false,
//       obfuscated: false
//     },
//     {
//       text: 'simple ',
//       color: 'green',
//       bold: false,
//       italic: false,
//       underlined: false,
//       strikethrough: false,
//       obfuscated: false
//     },
//     {
//       text: 'message',
//       color: 'aqua',
//       bold: false,
//       italic: false,
//       underlined: false,
//       strikethrough: false,
//       obfuscated: false
//     }
//   ]
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
