var Signature = require('./signature'),
    helpers = require('./helpers')

var Command = function () {}

Command.prototype.signature = function (signature) {
    this.signature = new Signature(typeof signature === 'string' ? signature : '{' + signature.join('}{') + '}')
    this.name = this.signature.name

    return this
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

Command.prototype.handle = function (callback) {
  if (this.valid()) {
    callback.call(this)
  }
}

Command.prototype.valid = function () {
  var arg

  for (arg in this.signature.args) {
    if (typeof this.signature.args[arg].value === 'undefined') {
      console.log('Missing required argument\n')
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

module.exports = new Command()