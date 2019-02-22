import { merge, mergeAll } from 'ramda'
import common from './common.js'

const { NODE_ENV, JWT_SECRET } = process.env

process.env.NODE_ENV = NODE_ENV || 'development'


function getConfig(env) {
  switch (env) {
    case 'test':
    case 'testing':
      return require('./testing.js')

    case 'prod':
    case 'production':
      return require('./production.js')

    case 'dev':
    case 'development':
    default:
      return require('./development.js')
  }
}


export default mergeAll([
  common,

  getConfig(process.env.NODE_ENV),

  {
    secrets: {
      jwt: JWT_SECRET || 'SOME_BASIC_SHIT',
    },
  }
])
