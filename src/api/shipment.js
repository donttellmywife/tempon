import { store } from 'APP'
import config from './config'

export default {
  list,
}

const { API } = config


function list() {
  const { token } = store.getters.user

  return fetch(`${API}/shipment`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }).then(getJson)
}

function getJson(res) { return res.json() }
