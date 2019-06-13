import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'


const schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },


  password: {
    type: String,
    required: true,
  },


  role: {
    type: String,
    enum: ['client', 'assistant'],
    default: 'client',
  },


  name: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
})


schema.pre('save', function(next) {
  if (!this.isModified('password')) return next()

  bcrypt.hash(this.password, 8, (err, hash) => {
    if (err) return next(err)

    this.password = hash
    next()
  })
})


schema.methods.checkPassword = function(password) {
  const hash = this.password

  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, same) => {
      if (err) return reject(err)
      resolve(same)
    })
  })
}

const User = model('user', schema)
export default User
