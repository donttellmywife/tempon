import config from './config'

export default {
  add,
  get,
  update,
  list,
  // remove,
}

const { API } = config


function add(order) {
  return fetch(`${API}/orders`, {
    method: 'POST',
    headers: {
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
  // TODO: add user validation for data retrieving - on server?
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


function list(id) {
  const params = id ? `?author=${id}` : ''
  return fetch(`${API}/orders${params}`).then(getJson)
}

function getJson(res) { return res.json() }
