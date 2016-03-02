var Signature = require('./signature'),
    helpers = require('./helpers')

var Command = function (signature, callback) {
    this.callback = callback
    this.signature = new Signature(typeof signature === 'string' ? signature : signature.join(' '))
    this.name = this.signature.name
}

Command.prototype.option = function (option) {
    if (typeof this.signature.options[option] !== 'undefined') {
        return this.signature.options[option].value
    }
}

Command.prototype.argument = function (argument) {
    if (typeof this.signature.args[argument] !== 'undefined') {
        return this.signature.args[argument].value
    }
}

Command.prototype.handle = function (multiple) {
  if (multiple !== true || this.isTarget()) {
    if (this.valid()) {
      this.callback()
    }
  }
}

Command.prototype.isTarget = function () {
  return true;
}

Command.prototype.valid = function () {
  var arg

  for (arg in this.signature.args) {
    if (typeof this.signature.args[arg].value === 'undefined') {
      console.log('Missing required arugment\n')
      console.log(this.help())
      return false
    }
  }

  return true
}

Command.prototype.help = function () {
  var i
    , args = []
    , options = []
    , help = ["Usage:"]

  if (this.name !== null) {
    help.push(this.name)
  }

  for (i in this.signature.options) {
    options.push(this.signature.options[i].help() + ": " + this.signature.options[i].description)
  }

  if (options.length) {
    help.push('[options]')
  }

  for (i in this.signature.args) {
    args.push(this.signature.args[i].help() + ": " + this.signature.args[i].description)
    help.push(this.signature.args[i].help())
  }

  help = help.join(' ')
  help += '\n\nOptions ---\n'
  help += options.join('\n')
  help += '\n\nArguments ---\n'
  help += args.join('\n')

  return help
}

module.exports = Command