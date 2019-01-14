const app = require('express')()
const bodyParser = require('body-parser')
const { connect } = require('./db/db.js')


const PORT = 4001

// app init, connect db etc
connect()

app.use(bodyParser.urlencoded({ extended: true }))
app.listen(PORT, () => console.log(`listening on ${PORT}`))


app.get('/', (req, res) => res.send('Hello dd'))

app.post('/users', (req, res) => {
  console.log('users creation etc')
})
