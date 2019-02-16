import { Schema, SchemaTypes, model } from 'mongoose'


const schema = new Schema({
  status: {
    type: String,
    enum: ['todo', 'in progress', 'ready', 'shipped'],
    default: 'todo',
    required: true,
  },


  fnsku: {
    type: String,
    required: true,
  },


  description: String,


  cargos: [
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


  createdBy: {
    ref: 'user',
    type: SchemaTypes.ObjectId,
    required: true,
  },


  dimensions: {
    depth: Number,
    height: Number,
    width: Number,
    weight: String,
  },
  price: String,
  pricePerUnit: String,
  labels: String,
}, {
  timestamps: true
})


const FBA = model('fba', schema)
export default FBA
