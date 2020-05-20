## minecraft-protocol-chat-parser
[![npm version](https://badge.fury.io/js/minecraft-protocol-chat-parser.svg)](https://www.npmjs.com/package/minecraft-protocol-chat-parser)

A small library to transform a string with Minecraft format caracter into a JavaScript object compatible with Minecraft's chat protocol

```javascript
const parse = require('minecraft-protocol-chat-parser').parse

console.log(parse('§4Hello §bWorld'));
```
Output
```
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

### TODO

Take the json object and convert it to a String
