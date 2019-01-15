import { Router } from 'express'
import user from './db.js'

const api = Router()

// MIDDLEWARE: add user to request
api.param('email', (req, res, next, email) => {
  user.find({ email })
    .then((user) => {
      if (!user) next(new Error(`User with ${email} not Found Error`))

      req.user = user
      next()
    })
})

// TODO: add jwt
api.route('/')
  .get((req, res) => {
    user.list()
      .then(users => res.json(users))
  })
  .post((req, res) => {
    user.create(req.body)
      .then(account => res.json(account))
      .catch(err => res.json(err))
  })


api.route('/:email')
  .get((req, res) => res.json(req.user))
  // TODO: update, delete

api.route('/:email/orders')
  .get((req, res) => res.json([]))

export default api
