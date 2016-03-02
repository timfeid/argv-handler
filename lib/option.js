'use strict'

var helpers = require('./helpers')

var Option = function (options) {
  this.name = options.name
  this.description = options.description
  this.shortcut = options.shortcut
  this.switch = options.switch
  this.default = options.default

  this.findValue()
}

Option.prototype.findValue = function () {
  helpers.options.forEach(function (option) {
    option = option.match(/(-?-)(\w+)=?(.*)/)
    if (option !== null) {
      if ((option[1] === '-' && option[2] === this.shortcut) || (option[1] === '--' && option[2] === this.name)) {
        this.value = this.switch ? true : option[3]
      }
    }
  }.bind(this))

  if (typeof this.value === 'undefined') {
    this.value = this.switch ? false : this.default
  }
}

Option.prototype.help = function () {
  var help = "--" + this.name;
  if (this.shortcut) {
    help = "(" + help + "|-" + this.shortcut + ")"
  }

  if (!this.switch) {
    help += '=';
  }

  if (this.default) {
    help += this.default
  }

  return help
}

module.exports = Option