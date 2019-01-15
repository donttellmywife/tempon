import express from 'express'
import { urlencoded, json } from 'body-parser';
import cors from 'cors'
import { connect } from 'mongoose'

import { api as UserApi, db } from 'USER'


const PORT = 4001

// TODO: add jwt
// TODO: take port from build
// TODO: app init
connect('mongodb://127.0.0.1:27017/orders', { useNewUrlParser: true })

const app = express()

app.use(cors())
app.use(urlencoded({ extended: true }))
app.use(json())

app.use('/users', UserApi)

app.post('/login', (req, res) => {
  db.find(req.body)
    .then(account => res.json(account))
    .catch(err => res.json(err))
})

app.listen(PORT, () => console.log(`starting server on ${PORT}`))
