## minecraft-protocol-chat-parser
[![npm version](https://badge.fury.io/js/minecraft-protocol-chat-parser.svg)](https://www.npmjs.com/package/minecraft-protocol-chat-parser)

A small library to transform a string with Minecraft format caracter into a JavaScript object compatible with Minecraft's chat protocol

```javascript
const parse = require('minecraft-protocol-chat-parser').parse

console.log(parse('§4Hello §bWorld'));
```
Output
```javascript
{
  text: '',
  extra: [
    {
      text: 'Hello ',   
      color: 'dark_red',
      bold: false,      
      italic: false,
      underlined: false,
      strikethrough: false,
      obfuscated: false
    },
    {
      text: 'World',
      color: 'aqua',
      bold: false,
      italic: false,
      underlined: false,
      strikethrough: false,
      obfuscated: false
    }
  ]
}
```

You can also access the mapping used to convert color codes into color names like that :

```javascript
const colorMapping = require('minecraft-protocol-chat-parser').colorCodes
```

Version 2.0.0 include a partial support to parse a JSON chat protocol data into a string. It's only support formating properties and will crash if the data contain hoverEvent, clickEvent or others properties who aren't used for text formating.

```javascript
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

console.log(parsed);
```

Output

> Hello §0Grooble §5§o§nHow are u §e§l?

The method `parseJSON(message, useAndChar)` can also take a boolean argument `useAndChar` if set to true the `§` will be replaced by `&` in the result string.

The method `parseExtra(extra, useAndChar)` take only one extra not the full message.