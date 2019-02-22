import { connect } from 'mongoose'
import config from 'CONFIG'
export default function (url = config.db.url, opts = {}) {
  return connect(url, { ...opts, useNewUrlParser: true })
}
