import WebSocket, { Server } from 'ws'
import { GameService } from '../services/game'
import { PlayerService } from '../services/players'

const playerService = new PlayerService()
const gameService = new GameService()

export function handleWebSocketMessage(
  ws: WebSocket,
  message: string,
  server: Server,
  clientId: string
) {
  const { type, data, id } = JSON.parse(message)

  const broadcast = (response: any) => {
    server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(response))
      }
    })
  }

  switch (type) {
    case 'reg': {
      const { name, password } = JSON.parse(data)
      console.log(id)
      const regResult = playerService.registerPlayer(name, password, clientId)
      ws.send(
        JSON.stringify({
          type: 'reg',
          data: JSON.stringify(regResult),
          id: id,
        })
      )
      console.log(regResult)
      break
    }
    case 'create_room': {
      console.log({ data })
      const roomId = gameService.createRoom()

      ws.send(
        JSON.stringify({
          type: 'create_room',
          data: roomId,
          id: id,
        })
      )
      const player = playerService.getPlayerById(clientId)
      gameService.addUserToRoom(roomId, player!.name, clientId)

      const rooms = gameService.getRooms()
      console.log(rooms)
      broadcast({ type: 'update_room', data: JSON.stringify(rooms), id: id })
      break
    }
    case 'add_user_to_room':
      const player = playerService.getPlayerById(clientId)
      const addUserResult = gameService.addUserToRoom(
        data.indexRoom,
        data.name,
        player!.id
      )
      ws.send(
        JSON.stringify({
          type: 'add_user_to_room',
          data: addUserResult,
          id: id,
        })
      )
      break
    case 'add_ships':
      const addShipsResult = gameService.addShips(
        data.gameId,
        data.ships,
        data.indexPlayer
      )
      ws.send(
        JSON.stringify({
          type: 'add_ships',
          data: addShipsResult,
          id: id,
        })
      )
      break
    case 'attack':
      const attackResult = gameService.handleAttack(
        data.gameId,
        data.x,
        data.y,
        data.indexPlayer
      )
      ws.send(
        JSON.stringify({
          type: 'attack',
          data: attackResult,
          id: id,
        })
      )
      break
    default:
      console.error(`Unknown message type: ${type}`)
  }
}
