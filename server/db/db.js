const { connect } = require('mongoose')

require('./schema/user.js')


module.exports = {
  connect: () => connect('mongodb://127.0.0.1:27017/orders'),
}
