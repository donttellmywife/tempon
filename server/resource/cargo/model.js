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
      type: Number,
      required: true,
      min: 0,
    },
    actual: {
      type: Number,
      min: 0,
    },
    left: {
      type: Number,
      min: 0,
      default: 0,
      required: true,
    },
  },


  createdBy: {
    ref: 'user',
    type: SchemaTypes.ObjectId,
    required: true,
  },


  status: {
    type: String,
    enum: ['todo', 'done', 'fail'],
    default: 'todo',
  },


  comment: String,
  labels: String,
}, {
  timestamps: true
})


schema.methods.canShip = function(wantToShip) {
  return wantToShip < this.quantity.left
}


const Cargo = model('cargo', schema)
export default Cargo
