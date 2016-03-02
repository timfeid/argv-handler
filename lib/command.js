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

Command.prototype.handle = function () {
    this.callback()
}

Command.prototype.help = function () {
  var i
    , args = []
    , options = []
    , help = ["Help for " + this.name + ":"]

  for (i in this.signature.args) {
    args.push(this.signature.args[i].name + " : " + this.signature.args[i].description)
    help.push(this.signature.args[i].help())
  }

  for (i in this.signature.options) {
    options.push(this.signature.options[i].name + " : " + this.signature.options[i].description)
    help.push(this.signature.options[i].help())
  }

  help = help.join(' ')
  help += '\n\nArguments ---\n'
  help += args.join('\n')
  help += '\n\nOptions ---\n'
  help += options.join('\n')

  return help
}

module.exports = Command