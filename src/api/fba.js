import { getJson, authHeader } from './common.js'
import config from './config'

export default {
  add,
  update,
  list,
  get,
}

const { API } = config


function add(shipment) {
  return fetch(`${API}/shipment/fba`, {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(shipment),
  })
    .then(getJson)
    .then((ship) => {
      if (!ship) return Promise.reject('Something went wrong on server side')
      return ship
    })
}

function get(id) {
  return fetch(`${API}/shipment/fba/${id}`, {
    headers: authHeader(),
  }).then(getJson)
}


function update(shipment) {
  return fetch(`${API}/shipment/fba/${shipment._id}`, {
    method: 'PUT',
    headers: authHeader(),
    body: JSON.stringify(shipment),
  }).then(getJson)
}


function list() {
  return fetch(`${API}/shipment/fba`, {
    headers: authHeader(),
  }).then(getJson)
}
