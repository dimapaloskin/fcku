const { error } = require('./error')

const { f, isFcku } = require('./f')
const { string, number, or, min, isGmail, array } = require('./presets')

const testOr = () => {
  try {
    const Schema = f(
      or(
        f(string, min(5)),
        number,
        error(n => 'Not valid')
      )
    )

    const s = Schema('1234')
    console.log(s)
  } catch (err) {
    console.error(err)
  }
}

const validMail = f(string, isGmail, min(6))

const main = () => {
  try {
    const Schema = f({
      title: string,
      count: {
        num: or(
          validMail,
          number
        )
      },
      arr: array(or(validMail, string))
    })

    const s = Schema({
      title: 'test',
      count: {
        num: 'asasd@gmail.com'
      }
    })

    console.log(s)
  } catch (err) {
    console.log('\n\n=========== FINAL ============')
    console.error(err)
  }
}

main()
