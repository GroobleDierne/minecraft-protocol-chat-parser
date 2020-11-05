# minecraft-protocol-chat-parser
[![npm version](https://badge.fury.io/js/minecraft-protocol-chat-parser.svg)](https://www.npmjs.com/package/minecraft-protocol-chat-parser)

A small library to transform a string with Minecraft format character into a JavaScript object compatible with Minecraft's chat protocol

## Functions

### parseString(message: string, acceptAndChar?: boolean)

```javascript
const parseString = require('minecraft-protocol-chat-parser')(735).parseString // replace 735 by the protocol number of the targeted minecraft version, 735 is 1.16

console.log(parseString('§4Hello §bWorld'));
```
Output
```javascript
{
  text: 'Hello ',   
  color: 'dark_red',
  bold: false,      
  italic: false,
  underlined: false,
  strikethrough: false,
  obfuscated: false,
  extra: [
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
### parseJSON(message: string | object, useAndChar?: boolean)

Version 2.0.0 include a partial support to parse a JSON chat protocol data into a string. It's only support formatting properties and will crash if the data contain hoverEvent, clickEvent or others properties who aren't used for text formatting.

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

If the argument `useAndChar` is set to true the `§` will be replaced by `&` in the result string.

### parseExtra(extra: string | object, useAndChar?: boolean)

The method `parseExtra(extra, useAndChar)` take only one extra not the full message.

If the argument `useAndChar` is set to true the `§` will be replaced by `&` in the result string.

## Variables

### jsonCodes

```javascript
{
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
```

### stringCodes

```javascript
{
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
```

[More examples.](https://github.com/GroobleDierne/minecraft-protocol-chat-parser/blob/master/example.js)