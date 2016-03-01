'use strict'

var Commands = function (commands) {
  this.commands = commands
}

Commands.prototype.handle = function () {
  return this.commands[0].handle()
}

module.exports = Commands