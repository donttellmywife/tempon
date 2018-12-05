const jsonServer = require('json-server');

const server = jsonServer.create();
// Returns an Express server


server.use(jsonServer.defaults());
// Set default middlewares (logger, static, cors and no-cache)


const router = jsonServer.router('./server/db.json');
server.use(router);
server.listen(4000);
console.log('Listening at 4000');
