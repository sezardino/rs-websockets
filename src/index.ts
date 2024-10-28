import dotenv from 'dotenv'

import { WebSocketServer } from 'ws'
import { httpServer } from './http_server'

dotenv.config()

const HTTP_PORT = process.env.HTTP_PORT || 8181
const WS_PORT = process.env.WS_PORT || 8081

console.log(`Start static http server on the ${HTTP_PORT} port!`)
httpServer.listen(HTTP_PORT)
const wsServer = new WebSocketServer({ port: Number(WS_PORT) })

wsServer.on('connection', (ws) => {
  console.log('New player connected')

  ws.on('message', (message) => {
    console.log('Received:', message)

    ws.send(JSON.stringify({ message: 'Command received', data: message }))
  })

  ws.on('close', () => {
    console.log('Player disconnected')
  })
})

wsServer.on('listening', () => {
  console.log(`WebSocket server started on ws://localhost:${WS_PORT}`)
})

process.on('SIGINT', () => {
  console.log('Shutting down server...')
  wsServer.close(() => {
    console.log('Server stopped.')
    process.exit()
  })
})
