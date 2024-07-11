const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
require("dotenv").config();

const port = process.env.PORT_JSONSERVER || 3006;

server.use(middlewares);
server.use(router);

server.listen(port);
console.log(
  "JSON Server is running on port \x1b[1;32m" + port + "\x1b[1;30m \n"
);
