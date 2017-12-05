const kindOf = require('kind-of')
const { ERROR, ERROR_CREATOR } = require('./constants')

class FckuError extends TypeError {
  constructor (message, args) {
    super(message)

    if (!args || kindOf(args) !== 'object') return

    Object.keys(args).forEach(key => {
      this[key] = args[key]
    })

    Object.defineProperty(this, ERROR, { value: true })
  }
}

const error = err => {
  function errorCreator (...args) {
    if (kindOf(err) === 'function') {
      throw new FckuError(err(args))
    }

    throw new FckuError(err)
  }

  Object.defineProperty(errorCreator, ERROR_CREATOR, { value: true })
  return errorCreator
}

const isFckuError = err => {
  return err[ERROR] === true
}

const isFckuErrorCreator = fn => {
  return fn[ERROR_CREATOR] === true
}

const findFckuErrorCreator = args => args.find(isFckuErrorCreator)

module.exports = {
  FckuError,
  error,
  isFckuError,
  isFckuErrorCreator,
  findFckuErrorCreator
}
