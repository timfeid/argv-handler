var Option = require('./option')
  , Argument = require('./argument')
  , argPosition = 0

var Signature = function (signature) {
  signature = signature || ''

  this._argPosition = 0
  this.signature = typeof signature === 'string' ? signature : '{' + signature.join('}{') + '}'
  this.args = []
  this.options = []

  this._parse()

  return this
}

Signature.prototype._parse = function () {
  var braces = this.signature.match(/{([^}]+)}/g)
    , option

  if (braces) {
    braces.forEach(function (brace) {
      this._parseBrace(brace)
    }.bind(this))
  }
}

Signature.prototype._parseBrace = function (brace) {
  var option = brace.match(/^{--([\w-]+)\s*\|?\s*([\w-]+)?\s*(=)?\s*([^:]+)?:?\s*?(.*)}$/)
    , arg

  if (option) {
    this._addOption(option)
  } else {
    arg = brace.match(/^{\s*([\w|_|-]+)\s*=?\s*([^\?:]+)?\s*:?\s*([\w|\s]+)?}$/)
    this._addArgument(arg)
  }
}


Signature.prototype._addOption = function (option) {
  this.options[option[1]] = new Option({
    name: option[1],
    shortcut: option[2],
    switch: typeof option[3] !== 'string' || option[3] !== '=',
    default: typeof option[4] !== 'undefined' ? option[4].trim() : undefined,
    description: typeof option[5] !== 'undefined' ? option[5].trim() : ''
  })
}

Signature.prototype._addArgument = function (arg) {
  this.args[arg[1]] = new Argument({
    name: arg[1],
    description: typeof arg[3] !== 'undefined' ? arg[3].trim() : '',
    default: typeof arg[2] !== 'undefined' ? arg[2].trim() : undefined,
    position: argPosition
  })
  this._argPosition++
}

module.exports = Signature