import { Schema, model } from 'mongoose'


const user = new Schema({
  email: {
    type: String,
    required: true,
    // createIndexes: true,
    unique: true,
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
    default: 'client',
    validate: () => true,
  },

  active: {
    type: Boolean,
    default: false,
  },
  orders: [{
    type: String,
    default: [],
  }],
  created: Date,
}, { timestamps: true })

const User = model('user', user)

export default User
