import express from 'express'
import { urlencoded, json } from 'body-parser';
import cors from 'cors'
import { connect } from 'mongoose'

import { api as UserApi, db } from 'USER'
import { handleError, login } from 'MODULES'

// config will differ on env (dev, prod, test)
import config from 'CONFIG'


const PORT = 4001

// TODO: app init
connect(config.db.url, { useNewUrlParser: true })

const app = express()

// MIDDLEWARE
app.use(cors())
app.use(urlencoded({ extended: true }))
app.use(json())
app.use(handleError)

app.use('/users', UserApi)

app.post('/login', login)

app.listen(PORT, () => console.log(`starting server on ${PORT}`))
