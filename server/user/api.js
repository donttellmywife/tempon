import { Router } from 'express'
import user from './db.js'

const api = Router()

// TODO: add jwt
api.post('/', (req, res) => {
  user.create(req.body)
    .then(account => res.send(account))
    .catch(err => res.send(err))
})

export default api
