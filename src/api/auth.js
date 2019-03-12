import config from './config.js'

const { API } = config

// 3 types of users:
// guest - can only register, login, and see content pages;
// client - we know this, cause he was able to login, can create and update records (only for himself);
// assistant - can update records of clients (approve, disapprove)
// base on type of user we determine possible actions and routes for user
export default {
  signup,
  signin,
}


function signup(email, password, role) {
  const body = JSON.stringify({ email, password, role })

  return fetch(`${API}/signup/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  })
    .then(res => res.json())
    .then((res) => {
      if (!res) return Promise.reject('Something went wrong on server side')
      if (res.error) return Promise.reject(res.error)
      return res
    })
}

function signin(email, password) {
  const body = JSON.stringify({ email, password })

  return fetch(`${API}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  })
    .then(res => res.json())
    .then((user) => {
      if (!user) return Promise.reject('Email or password incorrect')
      return user
    })
}
