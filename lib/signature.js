var Option = require('./option')
  , Argument = require('./argument')
  , argPosition = 0

var Signature = function (signature) {
  this.signature = signature
  this.name = null
  this.args = []
  this.options = []

  this._parse()
}

Signature.prototype._parse = function () {
  var nameMatch = this.signature.match(/^\s*([\w-:]+)/)
    , braces = this.signature.match(/{([^}]+)}/g)
    , option

  if (nameMatch) {
    argPosition++
    this.name = nameMatch[1]
  }

  braces.forEach(function (brace) {
    this._parseBrace(brace)
  }.bind(this))
}

Signature.prototype._parseBrace = function (brace) {
  var option = brace.match(/^{--([\w-]+)\|?([\w]+)?(=)?\s*([\w\s]+)?:?\s*?(.*)}$/)
    , arg

  if (option) {
    this._addOption(option)
  } else {
    arg = brace.match(/^{([\w|_|-]+)\s*=?\s*([^\?:]+)?\s*:?\s*([\w|\s]+)?}$/)
    this._addArgument(arg)
  }
}


Signature.prototype._addOption = function (option) {
  this.options[option[1]] = new Option({
    name: option[1],
    shortcut: option[2],
    switch: typeof option[3] !== 'string' || option[3] !== '=',
    default: typeof option[4] !== 'undefined' ? option[4].trim() : null,
    description: typeof option[5] !== 'undefined' ? option[5].trim() : null
  })
}

Signature.prototype._addArgument = function (arg) {
  this.args[arg[1]] = new Argument({
    name: arg[1],
    description: arg[3],
    default: arg[2],
    position: argPosition
  })
  argPosition++
}

module.exports = Signature