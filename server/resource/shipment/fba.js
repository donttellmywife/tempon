import { Schema, SchemaTypes, model } from 'mongoose'
import { priority, createdBy, user, cargos } from '../common.js'

const schema = new Schema({
  status: {
    type: String,
    enum: ['todo', 'in progress', 'ready', 'shipped'],
    default: 'todo',
    required: true,
  },


  fnsku: {
    type: [{
      url: String,
    }],
  },


  description: String,
  labels: [{
    url: String,
  }],


  box: [{
    length: Number,
    width: Number,
    height: Number,
    weight: String,
    description: String, // do we need it here?
  }],


  cargos,
  createdBy,
  user,
  priority,


  // price: String,
  // pricePerUnit: String,
}, {
  timestamps: true
})


const FBA = model('fba', schema)
export default FBA
