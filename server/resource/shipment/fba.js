import { Schema, SchemaTypes, model } from 'mongoose'


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
    type: [String],
  },


  description: String,
  labels: String,


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

    required: true,
  },


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
}, {
  timestamps: true
})


const FBA = model('fba', schema)
export default FBA
