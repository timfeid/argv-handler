var tap = require('tap')
, test = tap.test
, signature
, Signature
, argument1 = 'pizza-man'
, description = 'this is a description'
, argumentDefaultValue = '123321'
, option1 = '--extract-destination'
, option1Shortcut = 'e'
, option1Description = 'extract destination'
, optionDefaultValue = './path/to/something'
, option

test('load signature module', function (t) {
  Signature = require('../lib/signature')
  t.ok(Signature, "object loaded")
  t.end()
})

test('load signature module', function (t) {
  signature = new Signature()
  t.ok(Signature, "object loaded")
  t.end()
})

test('argument without default value', function (t) {
  signature = new Signature([
    argument1
  ])

  argument = signature.args[argument1]

  t.type(argument, 'object')
  t.equal(argument.name, argument1)
  t.type(argument.value, 'undefined')
  t.type(argument.default, 'undefined')
  t.type(argument.description, 'string')
  t.equal(argument.description, '')
  t.equal(argument.position, 0)
  t.end()
})

test('argument with default value', function (t) {
  signature = new Signature([
    argument1 + ' = ' + argumentDefaultValue
  ])

  argument = signature.args[argument1]

  t.type(argument, 'object')
  t.equal(argument.name, argument1)
  t.type(argument.value, 'string')
  t.type(argument.default, 'string')
  t.type(argument.description, 'string')
  t.equal(argument.description, '')
  t.equal(argument.position, 0)

  t.equal(argument.default, argumentDefaultValue)

  t.end()
})

test('argument with description', function (t) {
  signature = new Signature([
    argument1 + ' : ' + description
  ])

  argument = signature.args[argument1]

  t.type(argument, 'object')
  t.equal(argument.name, argument1)
  t.type(argument.value, 'undefined')
  t.type(argument.default, 'undefined')
  t.type(argument.description, 'string')
  t.equal(argument.description, description)
  t.equal(argument.position, 0)
  t.end()
})

test('argument with description', function (t) {
  signature = new Signature([
    argument1 + ' = ' + argumentDefaultValue + ' : ' + description
  ])

  argument = signature.args[argument1]

  t.type(argument, 'object')
  t.equal(argument.name, argument1)
  t.type(argument.value, 'string')
  t.type(argument.default, 'string')
  t.type(argument.description, 'string')
  t.equal(argument.description, description)
  t.equal(argument.position, 0)

  t.equal(argument.default, argumentDefaultValue)

  t.end()
})

test('switch option', function (t) {
  signature = new Signature([
    '--' + option1
  ])

  option = signature.options[option1]

  t.type(option, 'object')
  t.equal(option.description, '')
  t.equal(option.shortcut, undefined)
  t.equal(option.name, option1)
  t.equal(option.switch, true)
  t.equal(option.default, undefined)

  t.end()
})

test('switch option with description', function (t) {
  signature = new Signature([
    '--' + option1 + ' : ' + option1Description
  ])

  option = signature.options[option1]

  t.type(option, 'object')
  t.equal(option.description, option1Description)
  t.equal(option.shortcut, undefined)
  t.equal(option.name, option1)
  t.equal(option.switch, true)
  t.equal(option.default, undefined)

  t.end()
})

test('switch option with shortcut', function (t) {
  signature = new Signature([
    '--' + option1 + ' | ' + option1Shortcut
  ])

  option = signature.options[option1]

  t.type(option, 'object')
  t.equal(option.description, '')
  t.equal(option.shortcut, option1Shortcut)
  t.equal(option.name, option1)
  t.equal(option.switch, true)
  t.equal(option.default, undefined)

  t.end()
})

test('switch option with shortcut and description', function (t) {
  signature = new Signature([
    '--' + option1 + ' | ' + option1Shortcut + ' : ' + option1Description
  ])

  option = signature.options[option1]

  t.type(option, 'object')
  t.equal(option.description, option1Description)
  t.equal(option.shortcut, option1Shortcut)
  t.equal(option.name, option1)
  t.equal(option.switch, true)
  t.equal(option.default, undefined)

  t.end()
})

test('value option', function (t) {
  signature = new Signature([
    '--' + option1 + ' = '
  ])

  option = signature.options[option1]

  t.type(option, 'object')
  t.equal(option.description, '')
  t.equal(option.shortcut, undefined)
  t.equal(option.name, option1)
  t.equal(option.switch, false)
  t.equal(option.default, undefined)

  t.end()
})

test('value option with default value', function (t) {
  signature = new Signature([
    '--' + option1 + ' = ' + optionDefaultValue
  ])

  option = signature.options[option1]

  t.type(option, 'object')
  t.equal(option.description, '')
  t.equal(option.shortcut, undefined)
  t.equal(option.name, option1)
  t.equal(option.switch, false)
  t.equal(option.default, optionDefaultValue)

  t.end()
})

test('value option with default value and description', function (t) {
  signature = new Signature([
    '--' + option1 + ' = ' + optionDefaultValue + ' : ' + option1Description
  ])

  option = signature.options[option1]

  t.type(option, 'object')
  t.equal(option.description, option1Description)
  t.equal(option.shortcut, undefined)
  t.equal(option.name, option1)
  t.equal(option.switch, false)
  t.equal(option.default, optionDefaultValue)

  t.end()
})


test('value option & shortcut with', function (t) {
  signature = new Signature([
    '--' + option1 + ' | ' + option1Shortcut + ' = '
  ])

  option = signature.options[option1]

  t.type(option, 'object')
  t.equal(option.description, '')
  t.equal(option.shortcut, option1Shortcut)
  t.equal(option.name, option1)
  t.equal(option.switch, false)
  t.equal(option.default, undefined)

  t.end()
})

test('value option & shortcut with default value with', function (t) {
  signature = new Signature([
    '--' + option1 + ' | ' + option1Shortcut + ' = ' + optionDefaultValue
  ])

  option = signature.options[option1]

  t.type(option, 'object')
  t.equal(option.description, '')
  t.equal(option.shortcut, option1Shortcut)
  t.equal(option.name, option1)
  t.equal(option.switch, false)
  t.equal(option.default, optionDefaultValue)

  t.end()
})

test('value option & shortcut with default value and description with', function (t) {
  signature = new Signature([
    '--' + option1 + ' | ' + option1Shortcut + ' = ' + optionDefaultValue + ' : ' + option1Description
  ])

  option = signature.options[option1]

  t.type(option, 'object')
  t.equal(option.description, option1Description)
  t.equal(option.shortcut, option1Shortcut)
  t.equal(option.name, option1)
  t.equal(option.switch, false)
  t.equal(option.default, optionDefaultValue)

  t.end()
})