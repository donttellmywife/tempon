import config from './config'

export default {
  login,
  register,
  logout,
  update,
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

function login(email, password) {
  return fetch(`${API}/users?email=${email}&password=${password}`)
    .then(res => res.json())
    .then(([user]) => {
      if (!user) return Promise.reject('Email or password incorrect')
      return user
    })
}

function update() {}

function logout() {}
