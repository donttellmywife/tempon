import { getJson, authHeader } from './common.js'
import config from './config'

export default {
  list,
}

const { API } = config


function list() {
  return fetch(`${API}/shipment`, {
    headers: authHeader(),
  }).then(getJson)
}
