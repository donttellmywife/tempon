// import { store } from 'APP'
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


function add(order) {
  return fetch(`${API}/orders`, {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(order),
  })
    .then(getJson)
    .then((ord) => {
      console.log('ord: ', ord)
      if (!ord) return Promise.reject('Something went wrong on server side')
      if (ord.error) return Promise.reject(ord.error)
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


function del(id) {
  return fetch(`${API}/orders/${id}`, {
    method: 'DELETE',
    headers: authHeader(),
  }).then(getJson)
}
