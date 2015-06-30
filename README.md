# EntityJS - Utilities

## Data

A small utility which allows manipulating an object usings an xpath.

### Usage

```javascript
var data = require('ejs-data');
data({
  key1: 'my-element',
  key2: {
    subkey: 'hello'
  }
}).get('key2.subkey'); // = 'hello'
```
