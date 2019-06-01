import { Schema, SchemaTypes, model } from 'mongoose'
import { atleastOne } from '../validator.js'


const schema = new Schema({
  status: {
    type: String,
    enum: ['todo', 'in progress', 'ready', 'shipped'],
    default: 'todo',
    required: true,
  },


  priority: {
    type: String,
    enum: ['low', 'normal', 'high', 'urgent'],
    default: 'normal',
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


  cargos: {
    type: [
      {
        _id: {
          ref: 'cargo',
          type: SchemaTypes.ObjectId,
          required: true,
        },


        quantity: {
          type: Number,
          min: 0,
          required: true,
        },
      },
    ],
    validate: [atleastOne, '{PATH} need atleast one cargo'],
  },


  createdBy: {
    ref: 'user',
    type: SchemaTypes.ObjectId,
    required: true,
  },


  box: [{
    length: Number,
    width: Number,
    height: Number,
    weight: String,
    description: String, // do we need it here?
  }],


  // price: String,
  // pricePerUnit: String,
}, {
  timestamps: true
})


const FBA = model('fba', schema)
export default FBA
