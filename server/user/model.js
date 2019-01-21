import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'


const schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: () => true,
  },

  hash: {
    type: String,
    required: true,
    // validate: () => true,
  },

  role: {
    type: String,
    default: 'client',
    validate: () => true,
  },

  isActive: {
    type: Boolean,
    default: false,
  },

  orders: [{
    type: String,
    default: [],
  }],
}, {
  timestamps: true
})

// schema.methods = {
//   // password from user input, we dont save it, just encrypted version
//   authenticate: password => bcrypt.compareSync(password, this.password),
//
//   hashPassword(password) {
//     if (!password) throw new Error('Can\'t hash empty string')
//
//     const salt = bcrypt.genSaltSync(10)
//     return bcrypt.hashSync(password, salt)
//   }
// }

// schema.method({
//   authenticate: function(password) {
//     return bcrypt.compareSync(password, this.password)
//   },
// })

const User = model('user', schema)

export default User
