const kindOf = require('kind-of')
const { FCKU } = require('./constants')
const { isFckuErrorCreator, findFckuErrorCreator } = require('./error')
const { isAssert } = require('./assert')
const { or } = require('./presets')

const isFcku = fn => fn[FCKU] === true

const f = (...original) => {
  // const args = original.map(x => x)

  const step = function (val, next) {
    const args = next || original.map(x => x)
    const assert = args.shift()

    if (!assert) {
      return val
    }

    // skip error
    // f(..., ..., error('Error'), ...)
    if (isFckuErrorCreator(assert)) {
      return step(val, args)
    }

    // Execute assert
    if (isAssert(assert) || isFcku(assert)) {
      try {
        assert(val)
      } catch (err) {
        const customError = findFckuErrorCreator(args)
        const error = customError ? customError(val) : err
        throw error
      }

      return step(val, args)
    }

    if (kindOf(assert) === 'object') {
      Object.keys(assert).forEach(key => {
        const newVal = val[key]
        const newAssert = assert[key]
        val[key] = f(newAssert)(newVal)
      })

      return val
    }

    if (kindOf(assert) === 'array') {
      const newAssert = or.apply(or, assert)
      console.log(newAssert('asd'))
      process.exit(0)
      // this array hanlder
      // use 'or' probably
    }
  }

  Object.defineProperty(step, FCKU, { value: true })
  return step
}

module.exports = {
  f,
  isFcku
}
