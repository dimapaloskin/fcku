const kindOf = require('kind-of')
const { createAssert } = require('./assert')

const string = createAssert(val => kindOf(val) === 'string', val => `${val} is not string`)
const number = createAssert(val => kindOf(val) === 'number', val => `${val} is not number`)
const min = n => createAssert(val => val.length >= n, val => `${val} length less then ${n}`)
const max = n => createAssert(val => val.length <= n, val => `${val} length bigger then ${n}`)

const isGmail = createAssert(val => val.endsWith('@gmail.com'), val => `${val} is not gmail`)

const or = (...args) => {
  const step = createAssert(val => {
    const assert = args.shift()

    try {
      assert(val)
      return val
    } catch (err) {
      if (args.length) return step(val)
      return false
    }
  }, 'No any valid rules')

  return step
}

const array = (assert) => {
  return createAssert(val => {
  })
}

// const optional =

module.exports = {
  string,
  number,
  min,
  max,
  isGmail,
  or,
  array
}
