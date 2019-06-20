import { Schema, SchemaTypes, model } from 'mongoose'
import { atleastOne, isTrack } from '../validator.js'
import { createdBy, user } from '../common.js'

const schema = new Schema({
  status: {
    type: String,
    enum: ['todo', 'done', 'fail'],
    default: 'todo',
  },


  tracking: {
    type: [{
      value: {
        type: String,
        validate: {
          validator: isTrack,
          message: 'Tracking length not match (6-16)'
        },
      },

      quantity: {
        type: Number,
        min: 1,
        default: 1,
      }
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


  productInfo: {
    type: [{
      url: String,
    }],
  },


  comment: String,
  labels: String,


  createdBy,
  user,
}, {
  timestamps: true
})


// TODO: set 'left' on creation
// schema.pre('save', function(next) {
//   next();
// });


schema.methods.canShip = function(wantToShip) {
  return 0 < wantToShip && wantToShip <= this.quantity.left
}


const Cargo = model('cargo', schema)
export default Cargo
