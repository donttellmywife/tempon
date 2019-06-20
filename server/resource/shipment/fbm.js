import { Schema, SchemaTypes, model } from 'mongoose'
import { priority, createdBy, user, cargos } from '../common.js'

const schema = new Schema({
  status: {
    required: true,
    type: String,
    enum: ['todo', 'shipped'],
    default: 'todo',
  },


  deliverTo: {
    required: true,
    type: {
      recipient: String,
      company: String,
      recipient: String,
      state: String,
      zip: String,
      country: String,
      phone: String,
      email: String,
      address: [{
        line: String,
      }],
    },
  },


  description: String,
  courier: String,
  tracking: String,
  packing: [String],


  // NOT USED
  price: String,


  // IMPORTED
  cargos,
  createdBy,
  user,
  priority,
}, {
  timestamps: true
})


const FBM = model('fbm', schema)
export default FBM
