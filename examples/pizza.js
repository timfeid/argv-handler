#!/usr/bin/env node

var command = require('../lib')

var pizza = function () {
  console.log("Peppers:", this.option('peppers'))
  console.log("Pineapples:", this.option('pineapple'))
  console.log("BBQ Sauce:", this.option('bbq-sauce'))
  console.log("Cheese:", this.option('cheese'))
  console.log("Time of delivery:", this.argument('tod'))
}

command.signature([
  '--peppers|p : Peppers on that?',
  '--pineapple|P : Pineapples on that?',
  '--bbq-sauce : BBQ sauce on that?',
  '--cheese|c= mozz : Type of cheese',
  'tod : Time of delivery'
]).handle(pizza)