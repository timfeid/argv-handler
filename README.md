# mandator

```js
var Command = require('mandator')
  , command = new Command([
        '{time-of-delivery}',
        '{--peppers|p : peppers on that?}',
        '{--pineapple|P : pineapples on that?}',
        '{--bbq-sauce : bbq sauce on that?}',
        '{--cheese|c= mozz : type of cheese}'
    ], function () {
    console.log("PEPS? ", this.option('peppers'))
    console.log("PINES? ", this.option('pineapple'))
    console.log("BBQ? ", this.option('bbq-sauce'))
    console.log("CHEESE? ", this.option('cheese'))
    console.log("TIME? ", this.argument('time-of-delivery'))
  })
```
