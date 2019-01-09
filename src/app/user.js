// 3 types of users:
// guest - can only register, login, and see content pages;
// client - we know this, cause he was able to login, can create and update records (only for himself);
// assistant - can update records of clients (approve, disapprove)
// base on type of user we determine possible actions and routes for user
export default {
  login,
  register,
  logout,
  update,
}

const api = 'http://localhost:4000'

function register(email, password, role) {
  const body = JSON.stringify({email, password, role})

  return fetch(`${api}/users`, {
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
  return fetch(`${api}/users?email=${email}&password=${password}`)
    .then(res => res.json())
    .then(([user]) => {
      if (!user) return Promise.reject('Email or password incorrect')
      return user
    })
}

function update() {}

function logout() {}
