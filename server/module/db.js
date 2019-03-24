import { connect, connection } from 'mongoose'
import config from 'CONFIG'

connection.on('connect', () => {
  console.log('CONNECTED!');
})
connection.on('disconnect', () => {
  console.log('Mongoose default connection to DB : disconnected');
})

export default function (url = config.db.url, opts = {}) {
  return connect(url, { ...opts, useNewUrlParser: true })
}
