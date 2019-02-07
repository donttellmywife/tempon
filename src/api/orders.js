import { store } from 'APP'
import config from './config'

export default {
  add,
  get,
  update,
  list,
}

const { API } = config


function add(order) {
  const { token } = store.getters.user

  return fetch(`${API}/orders`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  })
    .then(getJson)
    .then((ord) => {
      if (!ord) return Promise.reject('Something went wrong on server side')
      return ord
    })
}


function get(id) {
  return fetch(`${API}/orders/${id}`).then(getJson)
}


function update(order) {
  return fetch(`${API}/orders/${order.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  }).then(getJson)
}


function list() {
  const { token } = store.getters.user

  return fetch(`${API}/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }).then(getJson)
}

function getJson(res) { return res.json() }
