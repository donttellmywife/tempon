import { store } from 'APP'


export function getJson(res) { return res.json() }

export function authHeader() {
  const { token } = store.getters.user
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }
}
