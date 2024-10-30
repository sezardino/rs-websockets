import dotenv from 'dotenv'

import { httpServer } from './http-server'
import { createWSServer } from './ws-server'

dotenv.config()

const HTTP_PORT = process.env.HTTP_PORT || 8181
const WS_PORT = process.env.WS_PORT || 3000

console.log(`Start static http server on the ${HTTP_PORT} port!`)
httpServer.listen(HTTP_PORT)

createWSServer(WS_PORT)
