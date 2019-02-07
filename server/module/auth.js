import expressJwt from 'express-jwt'
import { sign, verify } from 'jsonwebtoken'
import { merge } from 'ramda'

import config from 'CONFIG'
import { User } from 'USER'


const secret = config.secrets.jwt
const expiresIn = config.jwt.expiresIn
export const newToken = ({ email, role }) =>
  sign(
    { email, role },
    secret,
    { expiresIn }
  )

export const verifyToken = token =>
  new Promise((resolve, reject) => {
    verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })


export const signup = async (req, res) => {
  if (!req.body.email || !req.body.password) return res.status(400).send({ message: 'need email and password' })

  try {
    const user = await User.create(req.body)
    return signin(req, res)
  } catch (e) {
    return res.status(500).end()
  }
}


export const signin = async (req, res) => {
  if (!req.body.email || !req.body.password) return res.status(400).send({ message: 'need email and password' })

  const invalid = { message: 'Invalid email and passoword combination' }

  try {
    const user = await User.findOne({ email: req.body.email })
      .select('email password role')
      .exec()

    if (!user) return res.status(401).send(invalid)

    const match = await user.checkPassword(req.body.password)

    if (!match) return res.status(401).send(invalid)

    const token = newToken(user)
    return res.status(201).send({
      token,
      email: user.email,
      role: user.role,
    })
  } catch (e) {
    console.error(e)
    res.status(500).end()
  }
}


export const protect = async (req, res, next) => {
  const bearer = req.headers.authorization

  if (!bearer || !bearer.startsWith('Bearer ')) return res.status(401).end()

  const token = bearer.split('Bearer ')[1].trim()
  let payload
  try {
    payload = await verifyToken(token)
  } catch (e) {
    return res.status(401).end()
  }

  const [user] = await User.find({ email: payload.email })
    .select('-password')
    .lean()
    .exec()

  if (!user) return res.status(401).end()

  req.user = user
  next()
}
