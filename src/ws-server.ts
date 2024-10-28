import WebSocket, { WebSocketServer } from 'ws'
import { handleWebSocketMessage } from './controllers/ws'

const clients: Record<string, WebSocket> = {}

export const createWSServer = (port: string | number) => {
  const server = new WebSocketServer({ port: +port })
  console.log(`WebSocket server started on ws://localhost:${port}`)

  server.on('connection', (ws: WebSocket) => {
    const clientId = Date.now().toString()
    clients[clientId] = ws

    ws.on('message', (message: string) =>
      handleWebSocketMessage(ws, message, server, clientId)
    )

    ws.on('close', () => {
      console.log('Connection closed')
    })
  })

  process.on('SIGINT', () => {
    console.log('Shutting down server...')
    server.close(() => {
      console.log('Server stopped.')
      process.exit()
    })
  })

  return server
}
