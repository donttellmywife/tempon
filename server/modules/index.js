export { default as handleError } from './error.js'
export { login, signToken } from './auth.js'

export function log(...args) {
  console.log(args)
  return args
}
