import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import { db, User } from 'USER'


// TODO: move to config
const secret = 'yeezy350boost'
const expiresIn = '30d'
const checkToken = expressJwt({ secret })


export const login = (req, res, next) => {
  // req.user will be there from the middleware
  // verify user. Then we can just create a token
  // and send it back for the client to consume
  db.find(req.body)
    .then(user => ({
      ...user,
      token: signToken(user.email),
    }))
    .then(user => res.json(user))
}


export const decodeToken = () => (req, res, next) => {
  // make it optional to place token on query string
  // if it is, place it on the headers where it should be
  // so checkToken can see it. See follow the 'Bearer 034930493' format
  // so checkToken can see it and decode it
  if (req.query && req.query.hasOwnProperty('access_token')) {
    req.headers.authorization = 'Bearer ' + req.query.access_token
  }

  // this will call next if token is valid
  // and send error if its not. It will attached
  // the decoded token to req.user
  checkToken(req, res, next)
}

export const getFreshUser = () => (req, res, next) => {
  return User.findById(req.user.id)
    .then(user => {
      if (!user) {
        // if no user is found it was not
        // it was a valid JWT but didn't decode
        // to a real user in our DB. Either the user was deleted
        // since the client got the JWT, or
        // it was a JWT from some other source
        res.status(401).send('Unauthorized')
      } else {
        // update req.user with fresh user from
        // stale token data
        req.user = user
        next()
      }
    })
    .catch(next)
}

export const verifyUser = () => (req, res, next) => {
  const email = req.body.email
  const password = req.body.password

  // if no username or password then send
  if (!username || !password) return res.status(400).send('You need a username and password')

  // look user up in the DB so we can check
  // if the passwords match for the username
  User.find({ email })
    .then(user => {
      if (!user) {
        res.status(401).send('No user with the given username')
      }

      // checking the passowords here
      if (!user.authenticate(password)) res.status(401).send('Wrong password')

      // if everything is good,
      // then attach to req.user
      // and call next so the controller
      // can sign a token from the req.user._id
      req.user = user;
      next()
    })
    .catch(next)
}

export const signToken = email => jwt.sign(
  { email },
  secret,
  { expiresIn }
)

export const protect = [decodeToken(), getFreshUser()]