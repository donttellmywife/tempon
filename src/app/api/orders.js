import config from './config'

export default {
  // create,
  // read,
  // update,
  // remove,
  list,
}

const { API } = config

function register(email, password, role) {
  const body = JSON.stringify({email, password, role})

  return fetch(`${API}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  })
    .then(res => res.json())
    .then((user) => {
      if (!user) return Promise.reject('Something went wrong on server side')
      return user
    })
}

function list(id) {
  const params = id ? `?author=${id}` : ''

  return fetch(`${API}/orders${params}`)
    .then(res => res.json())
}
