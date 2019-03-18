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


  address: {
    required: true,
    type: String,
  },


  description: String,
  courier: String,
  packing: [String],


  createdBy: {
    required: true,
    ref: 'user',
    type: SchemaTypes.ObjectId,
  },


  price: String,
  tracking: String,
}, {
  timestamps: true
})


const FBM = model('fbm', schema)
export default FBM
