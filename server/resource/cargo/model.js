import { Schema, SchemaTypes, model } from 'mongoose'
import { atleastOne } from '../validator.js'


const schema = new Schema({
  tracking: {
    type: [{
      type: String,
      validate: {
        validator: ({ length }) => length >= 6 && length <= 16,
      },
      message: 'Tracking length not match (6-16)'
    }],
    validate: [atleastOne, '{PATH} need at least one tracking'],
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


// TODO: set 'left' on creation
schema.pre('save', function(next) {
  next();
});


schema.methods.canShip = function(wantToShip) {
  return wantToShip <= this.quantity.left
}


const Cargo = model('cargo', schema)
export default Cargo
