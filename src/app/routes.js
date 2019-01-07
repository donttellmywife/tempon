import {About, Home, Login} from 'PAGE'
import user from './user'

const {isGuest} = user

export default [
  { path: '/', component: Home, beforeEnter: hasRights },
  { path: '/about', component: About, beforeEnter: hasRights },
  { path: '/login', component: Login },
]

function hasRights(to, from, next) {
  return isGuest
    ? next({
      path: '/login',
      query: {redirect: to.fullPath},
    })
    : next()
}
