const { Schema, model } = require('mongoose')


const user = new Schema({
  email: {
    type: String,
    required: true,
    createIndexes: true,
    lowercase: true,
    validate: () => true,
  },
  password: {
    type: String,
    required: true,
    validate: () => true,
  },
  role: {
    type: String,
    validate: () => true,
  },
  created: Date,
})

const User = model('user', user)

module.exports = {
  User,
}
