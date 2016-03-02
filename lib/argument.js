'use strict'

var helpers = require('./helpers')

var Arugment = function (options) {
  this.name = options.name
  this.description = options.description
  this.default = options.default
  this.position = options.position
  this._findValue()
}

Arugment.prototype._findValue = function () {
  this.value = helpers.args[this.position] || this.default
}

Arugment.prototype.help = function () {
  var help = this.name;

  if (this.default) {
    help += '=' + this.default
  }

  return help
}

module.exports = Arugment