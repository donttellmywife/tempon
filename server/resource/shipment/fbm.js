import { Schema, SchemaTypes, model } from 'mongoose'
import { atleastOne } from '../validator.js'


const schema = new Schema({
  status: {
    required: true,
    type: String,
    enum: ['todo', 'shipped'],
    default: 'todo',
  },


  cargos: {
    type: [
      {
        _id: {
          required: true,
          ref: 'cargo',
          type: SchemaTypes.ObjectId,
        },


        quantity: {
          required: true,
          type: Number,
          min: 0,
        },
      },
    ],
    validate: [atleastOne, '{PATH} need atleast one cargo'],
  },


  deliverTo: {
    required: true,
    type: {
      recipient: String,
      company: String,
      address: [{
        line: String,
      }],
      recipient: String,
      state: String,
      zip: String,
      country: String,
      phone: String,
      email: String,
    },
  },


  description: String,
  courier: String,
  packing: [String],
  priority: {
    type: String,
    enum: ['low', 'normal', 'high', 'urgent'],
    default: 'normal',
  },


  createdBy: {
    required: true,
    ref: 'user',
    type: SchemaTypes.ObjectId,
  },


  user: {
    name: {
      type: String,
    },
    email: {
      type: String,
    }
  },


  price: String,
  tracking: String,
}, {
  timestamps: true
})


const FBM = model('fbm', schema)
export default FBM
