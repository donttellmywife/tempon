const { Schema, model } = require('mongoose')


const user = new Schema({
  email: String,
  password: String,
  id: String,
})

const User = model('user', user)

module.exports = {
  User,
}
