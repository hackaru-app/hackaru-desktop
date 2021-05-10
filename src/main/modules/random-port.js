const http = require('http')

module.exports.getRandomPort = function () {
  return new Promise((resolve) => {
    const server = http.createServer()
    server.listen(0, () => {
      resolve(server.address().port)
      server.close()
    })
  })
}
