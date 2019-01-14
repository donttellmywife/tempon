const { connect } = require('mongoose')

const { User } = require('./schema/user.js')

// TODO: more generic errors


module.exports = {
  connect: () => connect('mongodb://127.0.0.1:27017/orders'),

  user: {
    create: user => User.create(user).catch(error => Promise.reject({ error: 'Couldn\'t create user' })),
    find: user => User.find(user).catch(error => Promise.reject({ error: 'No such user' })),
  },
}
