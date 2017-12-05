const { ASSERT } = require('./constants')
const { error, isFckuErrorCreator, isFckuError } = require('./error')

const createAssert = (test, defaultError) => {
  // TUTU: async/await in feature?

  const assert = function (val) {
    // TODO: add required checking
    if (!val) return val
    try {
      const isValid = test(val)

      if (!isValid) {
        const resolvedError = isFckuErrorCreator(defaultError) ? defaultError : error(defaultError)
        resolvedError(val)
      }
    } catch (err) {
      // TODO: ??
      throw err
      // if (isFckuError(err)) throw err
      // const resolvedError = isFckuErrorCreator(defaultError) ? defaultError : error(defaultError)
      // resolvedError(val)
    }

    return val
  }

  Object.defineProperty(assert, ASSERT, { value: true })
  return assert
}

const isAssert = fn => fn[ASSERT] === true

module.exports = {
  createAssert,
  isAssert
}
