import * as http from 'http'
import { AddressInfo } from 'net'

export function getRandomPort(): Promise<number> {
  return new Promise((resolve) => {
    const server: http.Server = http.createServer()
    server.listen(0, () => {
      const { port } = server.address() as AddressInfo
      resolve(port)
      server.close()
    })
  })
}
