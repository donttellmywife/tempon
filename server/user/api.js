import { Router } from 'express'
import bcrypt from 'bcryptjs'

import User from './model.js'
import { login, log } from 'MODULES'

const api = Router()
export default api


// ORDER OF SUBSCRIBERS MATTERS
// MIDDLEWARE: add user to request
api.param('email', (req, res, next, email) => {
  User.find({ email })
    .then((user) => {
      if (!user) next(new Error(`User with ${email} not found`))

      console.log('woohoo, we def go here!')
      req.user = user
      next()
    })
})


api.route('/')
  .get((req, res) => User.find({}))
  .post(createUser)

function createUser(req, res, next) {
  const { email, password, role } = req.body
  if (!email || !password || !role) return res.status(400).json({ message: 'Validation failed' })
  // TODO: add email and password validation

  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)

  User.create({ email, role, hash })
    .then(user => login(req, res, next))
    // TODO: add specific errors
    .catch(err => res.status(400).json({ message: 'unable to register user' }))
}


// TODO: update, delete
api.route('/:email')
  .get((req, res) => res.json(req.user))


api.route('/:email/orders')
  .get(getOrders)


function getOrders(req, res) {
  User.find({ email: req.params.email }).exec()
    .then(([ user ]) => user.orders)
    .then(orders => res.json(orders))
    .catch(err => res.status(400).json({ message: 'error getting orders for user' }))
}
