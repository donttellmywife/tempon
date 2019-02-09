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
  },


  quantity: {
    expected: {
      type: String,
      required: true,
    },
    actual: String,
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
  status: {
    type: String,
    default: 'todo' // one of ['todo', 'done', 'fail']
  },
}, {
  timestamps: true
})


const Cargo = model('cargo', schema)
export default Cargo
