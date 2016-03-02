var argvs
  , args
  , options

var getArgvs = function () {
    argvs = argvs || process.argv.splice(2)
    return argvs
}

var getArgs = function () {
    args = args || getArgvs().filter(function (arg) {
        return arg.substr(0, 1) !== '-'
    })

    return args
}

var getOptions = function () {
    options = options || getArgvs().filter(function (arg) {
        return arg.substr(0, 1) === '-'
    })

    return options
}

exports.args = getArgs()
exports.options = getOptions()