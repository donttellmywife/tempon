import { Router } from 'express'

import User from './model.js'

const api = Router()
export default api


api.route('/')
  .get((req, res) => User.find({}))


// TODO: update, delete
api.route('/:email')
  .get((req, res) => res.json(req.user))
