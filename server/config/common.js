export default {
  port: 3000,

  db: {
    url: `mongodb://127.0.0.1/orders`,
    port: 27017,
  },

  jwt: {
    expiresIn: '30d',
  },

  secrets: {
    jwt: 'blank',
  },
}
