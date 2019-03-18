// import { store } from 'APP'
import { getJson, authHeader } from './common.js'
import config from './config'

export default {
  add,
  get,
  update,
  list,
}

const { API } = config


function add(order) {
  return fetch(`${API}/orders`, {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(order),
  })
    .then(getJson)
    .then((ord) => {
      if (!ord) return Promise.reject('Something went wrong on server side')
      return ord
    })
}


function get(id) {
  return fetch(`${API}/orders/${id}`, {
    headers: authHeader(),
  }).then(getJson)
}


function update(order) {
  return fetch(`${API}/orders/${order._id}`, {
    method: 'PUT',
    headers: authHeader(),
    body: JSON.stringify(order),
  }).then(getJson)
}


function list() {
  return fetch(`${API}/orders`, {
    headers: authHeader(),
  }).then(getJson)
}


// HELPERS
// function getJson(res) { return res.json() }
//
// function authHeader() {
//   const { token } = store.getters.user
//   return {
//     Authorization: `Bearer ${token}`,
//     'Content-Type': 'application/json',
//   }
// }
