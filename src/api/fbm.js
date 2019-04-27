import { getJson, authHeader } from './common.js'
import config from './config'

export default {
  add,
  get,
  update,
  list,
  del,
}

const { API } = config


function add(shipment) {
  return fetch(`${API}/shipment/fbm`, {
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
  return fetch(`${API}/shipment/fbm/${id}`, {
    headers: authHeader(),
  }).then(getJson)
}


function del(id) {
  return fetch(`${API}/shipment/fbm/${id}`, {
    method: 'DELETE',
    headers: authHeader(),
  }).then(getJson)
}


function update(shipment) {
  return fetch(`${API}/shipment/fbm/${shipment._id}`, {
    method: 'PUT',
    headers: authHeader(),
    body: JSON.stringify(shipment),
  }).then(getJson)
}


function list() {
  return fetch(`${API}/shipment/fbm`, {
    headers: authHeader(),
  }).then(getJson)
}
