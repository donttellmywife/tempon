import { Router } from 'express'

import User from './model.js'
import { login } from 'MODULES/auth.js'

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
