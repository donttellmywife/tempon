import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { urlencoded, json } from 'body-parser';
import { connect } from 'mongoose'


// config is differ on env (dev, prod, test)
import config from 'CONFIG'
import handleError from 'MODULES/error.js'
import { api as UserApi } from 'USER'
import { signin, signup, protect } from 'MODULES/auth.js'
import OrdApi from './resource/order/route.js'


const app = express()

app.disable('x-powered-by')

// MIDDLEWARE
app.use(cors())
app.use(urlencoded({ extended: true }))
app.use(json())
app.use(morgan('dev'))
app.use(handleError)


app.post('/signin', signin)
app.post('/signup', signup)

app.use('/orders', protect, OrdApi)


export const start = async () => {
  try {
    await connect(config.db.url, { useNewUrlParser: true })
    app.listen(config.port, () => console.log(`REST API on http://localhost:${config.port}/`))
  } catch (e) {
    console.error(e)
  }
}

start()
