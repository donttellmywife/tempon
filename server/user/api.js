import { Router } from 'express'
import bcrypt from 'bcryptjs'
import User from './model.js'
import { login } from 'MODULES'

const api = Router()
export default api

// ORDER OF SUBSCRIBERS MATTERS
// MIDDLEWARE: add user to request
api.param('email', (req, res, next, email) => {
  User.find({ email })
    .then((user) => {
      if (!user) next(new Error(`User with ${email} not Found Error`))

      req.user = user
      next()
    })
})


api.route('/')
  .get((req, res) => User.find({}))
  .post(createUser)

function createUser(req, res, next) {
  const { email, password, role } = req.body
  if (!email || !password || !role) return res.status(400).send('Validation failed')

  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)

  User.create({ email, role, hash, })
    .then(user => login(req, res, next))
    // .then(user => {
    //   const forClient = {
    //     email,
    //     role,
    //     orders: user.orders,
    //     isActive: user.isActive,
    //     token: signToken(user),
    //   }
    //
    //   res.json(user)
    // })
    // TODO: add specific errors
    .catch(err => res.status(400).json({message: 'sorry'}))
}


// TODO: update, delete
api.route('/:email')
  .get((req, res) => res.json(req.user))


api.route('/:email/orders')
  .get((req, res) => res.json([]))
