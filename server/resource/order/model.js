import { Schema, SchemaTypes, model } from 'mongoose'


const schema = new Schema({
  tracking: {
    type: String,
    required: true,
  },


  description: {
    expected: {
      type: String,
      required: true,
    },
    actual: String,
    isMatch: {
      type: Boolean,
      default: true,
    }
  },


  quantity: {
    expected: {
      type: String,
      required: true,
    },
    actual: String,
    isMatch: {
      type: Boolean,
      default: true,
    }
  },


  createdBy: { 
    ref: 'user',
    type: SchemaTypes.ObjectId,
    required: true,
  },


  verifiedBy: {
    ref: 'user',
    type: SchemaTypes.ObjectId,
  },
  verifiedAt: Date,


  comment: String,
  labels: String,
}, {
  timestamps: true
})


const Order = model('order', schema)
export default Order
