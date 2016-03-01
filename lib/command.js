'use strict'

var Option = require('./option')
  , Argument = require('./argument')

var Command = function (signature, callback) {
  this.signature = signature
  this.callback = callback
  this.options = []
  this.args = []
  this._parseSignature()
}

Command.prototype._parseSignature = function () {
  var matches = this.signature.match(/{([^}]+)}/g)
    , options
    , args
    , currentArgument = 1

  matches.forEach(function (sig) {
    options = sig.match(/^{--([\w]+)\|?([\w]+)?(=)?\s*([\w\s]+)?:?\s*?(.*)}$/)

    if (options) {
      this.options[options[1]] = new Option({
        name: options[1],
        shortcut: options[2],
        switch: typeof options[3] !== 'string' || options[3] !== '=',
        default: options[4].trim(),
        description: options[5].trim()
      })
    } else {
      args = sig.match(/^{([\w|_]+)\s*=?\s*([^\?:]+)?\s*:?\s*([\w|\s]+)?}$/)

      this.args[args[1]] = new Argument({
        name: args[1],
        description: args[3],
        default: args[2],
        value: process.argv.splice(2)[currentArgument]
      })
    }

  }.bind(this))
}

Command.prototype.option = function (option) {
  if (typeof this.options[option] !== 'undefined') {
    return this.options[option]
  }
}

Command.prototype.argument = function (argument) {
  if (typeof this.args[argument] !== 'undefined') {
    return this.args[argument]
  }
}

Command.prototype.handle = function () {
  this.validate()
  this.callback.call(this)
}

Command.prototype.validate = function () {
}

module.exports = Command