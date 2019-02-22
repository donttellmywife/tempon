import { store } from 'APP'
import config from './config'

export default {
  add,
  // get,
  update,
  list,
}

const { API } = config


function add(shipment) {
  const { token } = store.getters.user

  return fetch(`${API}/shipment/fba`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(shipment),
  })
    .then(getJson)
    .then((ship) => {
      if (!ship) return Promise.reject('Something went wrong on server side')
      return ship
    })
}


// function get(id) {
//   return fetch(`${API}/shipments/${id}`).then(getJson)
// }
//
//
function update(shipment) {
  const { token } = store.getters.user

  return fetch(`${API}/shipment/fba/${shipment._id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(shipment),
  }).then(getJson)
}
//
//
function list() {
  const { token } = store.getters.user

  return fetch(`${API}/shipment/fba`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }).then(getJson)
}

function getJson(res) { return res.json() }
