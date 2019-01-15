import { Router } from 'express'
import user from './db.js'

const api = Router()
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
  .post((req, res) => {
    user.create(req.body)
      .then(account => res.send(account))
      .catch(err => res.send(err))
  })

api.route('/:email')
  .get((req, res) => {
    res.send(req.user)
  })

export default api
