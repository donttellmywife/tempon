import User from './model.js'

// TODO: more generic errors


export default {
  create: user => User.create(user).catch(error => Promise.reject({ error: 'Couldn\'t create user' })),
  find: user => User.find(user).exec().catch(error => Promise.reject({ error: 'No such user' })),
  findById: id => User.findById(id).exec().catch(error => Promise.reject({ error: `No such user with id: ${id}` })),
  findByEmail: id => User.find({ email }).exec().catch(error => Promise.reject({ error: `No such user with id: ${id}` })),
  list: () => User.find({}).exec().catch(error => Promise.reject({ error: 'Something went wrong' })),
}
