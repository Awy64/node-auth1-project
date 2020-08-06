const server = require('./api/server');

const port = 1337;

server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`)
})