import { merge } from 'ramda'
import common from './common.js'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'


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

export default merge(common, getConfig(process.env.NODE_ENV))
