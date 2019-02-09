import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import { urlencoded, json } from 'body-parser';

dotenv.config()
// config is differ on env (dev, prod, test)
// therefor use dotenv ASAP
import config from 'CONFIG'
import connect from 'MODULES/db.js'
import handleError from 'MODULES/error.js'
import { api as UserApi } from 'USER'
import { signin, signup, protect } from 'MODULES/auth.js'
import OrdApi from './resource/cargo/router.js'


const app = express()

app.disable('x-powered-by')

// MIDDLEWARE
app.use(cors())
app.use(urlencoded({ extended: true }))
app.use(json())
app.use(handleError)
app.use(morgan('dev'))


app.post('/signin', signin)
app.post('/signup', signup)

app.use('/orders', protect, OrdApi)


export const start = async () => {
  try {
    await connect()
    app.listen(config.port, () => console.log(`REST API on http://localhost:${config.port}/`))
  } catch (e) {
    console.error(e)
  }
}

start()
