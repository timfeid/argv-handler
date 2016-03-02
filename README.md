# mandator

```js
var command = require('mandator')

var pizza = function () {
  console.log("Peppers:", this.option('peppers'))
  console.log("Pineapples:", this.option('pineapple'))
  console.log("BBQ Sauce:", this.option('bbq-sauce'))
  console.log("Cheese:", this.option('cheese'))
  console.log("Time of delivery:", this.argument('time-of-delivery'))
}

command.signature([
  '--peppers|p : peppers on that?',
  '--pineapple|P : pineapples on that?',
  '--bbq-sauce : bbq sauce on that?',
  '--cheese|c= mozz : type of cheese',
  'time-of-delivery'
]).handle(pizza)
```
