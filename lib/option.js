'use strict'

var Option = function (options) {
  this.name = options.name
  this.description = options.description
  this.shortcut = options.shortcut
  this.switch = options.switch
  this.default = options.default
}

module.exports = Option