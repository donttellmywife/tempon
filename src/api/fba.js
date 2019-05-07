import { getJson, authHeader } from './common.js'
import config from './config'

export default {
  add,
  update,
  list,
  get,
  del,
}

const { API } = config
const FBA_API = `${API}/shipment/fba`


function add(shipment) {
  return fetch(FBA_API, {
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
  return fetch(`${FBA_API}/${id}`, {
    headers: authHeader(),
  }).then(getJson)
}


function del(id) {
  return fetch(`${FBA_API}/${id}`, {
    method: 'DELETE',
    headers: authHeader(),
  }).then(getJson)
}


function update(shipment) {
  return fetch(`${FBA_API}/${shipment._id}`, {
    method: 'PUT',
    headers: authHeader(),
    body: JSON.stringify(shipment),
  }).then(getJson)
}


function list() {
  return fetch(FBA_API, {
    headers: authHeader(),
  }).then(getJson)
}
