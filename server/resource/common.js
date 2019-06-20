import { Schema, SchemaTypes } from 'mongoose'
import { atleastOne } from './validator.js'


export const priority = {
  type: String,
  enum: ['low', 'normal', 'high', 'urgent'],
  default: 'normal',
}

export const cargos = {
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
}

export const createdBy = {
  ref: 'user',
  type: SchemaTypes.ObjectId,
  required: true,
}

export const user = {
  name: {
    type: String,
  },
  email: {
    type: String,
  }
}
