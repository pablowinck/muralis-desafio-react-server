const jsonServer = require("json-server");
const fs = require("fs");
const data = require("./data.json");

fs.writeFileSync("/tmp/data.json", JSON.stringify(data));
const server = jsonServer.create();
const router = jsonServer.router("/tmp/data.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(
  jsonServer.rewriter({
    "/api/*": "/$1",
    "/blog/:resource/:id/show": "/:resource/:id",
  })
);
server.use(router);
server.listen(3001, () => {
  console.log("JSON Server is running");
});

module.exports = server;
