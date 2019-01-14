const app = require('express')()
const bodyParser = require('body-parser')
const cors = require('cors')

const { connect, user } = require('./db/db.js')


const PORT = 4001

// TODO: add jwt
// TODO: take port from build


// app init, connect db etc
connect()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.listen(PORT, () => console.log(`starting server on ${PORT}`))


// USERS
app.post('/users', (req, res) => {
  user.create(req.body)
    .then(account => res.send(account))
    .catch(err => res.send(err))
})

app.post('/login', (req, res) => {
  user.find(req.body)
    .then(account => res.send(account))
    .catch(err => res.send(err))
})
