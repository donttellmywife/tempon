import { Schema, SchemaTypes, model } from 'mongoose'


const schema = new Schema({
  tracking: {
    type: String,
    required: true,
  },


  type: {
    type: String,
    enum: ['amazon', 'post'],
    default: 'amazon',
  },


  status: {
    type: String,
    enum: ['todo', 'in progress', 'done'],
    default: 'todo',
  },


  fromOrders: {
    ref: 'cargo',
    type: [SchemaTypes.ObjectId],
    required: true,
  },


  description: {
    type: String,
    required: true,
  },


  quantity: {
    type: String,
    required: true,
  },


  createdBy: {
    ref: 'user',
    type: SchemaTypes.ObjectId,
    required: true,
  },


  assistedBy: {
    ref: 'user',
    type: SchemaTypes.ObjectId,
  },
  assistedAt: Date,


  comment: String,
  labels: String,
}, {
  timestamps: true
})


const FBM = model('fbm', schema)
export default FBM
