interface Room {
  roomId: string
  roomUsers: { name: string; index: string }[]
}

export class GameService {
  private rooms: Room[] = []

  getRooms() {
    return this.rooms
  }

  createRoom() {
    const roomId = this.rooms.length.toString()
    const newRoom: Room = { roomId, roomUsers: [] }
    this.rooms.push(newRoom)

    return roomId
  }

  addUserToRoom(roomId: string, playerName: string, playerId: string) {
    const room = this.rooms.find((room) => room.roomId === roomId)

    if (!room) return { error: true, errorText: 'Room not found' }
    if (room.roomUsers.length >= 2)
      return { error: true, errorText: 'Room is full' }

    room.roomUsers.push({ name: playerName, index: playerId })

    return { error: false, playerAdded: playerName, roomId }
  }

  addShips(gameId: string, ships: any, playerIndex: number) {
    return { success: true, gameId, ships }
  }

  handleAttack(gameId: string, x: number, y: number, playerIndex: number) {
    return { success: true, gameId, x, y, result: 'hit' }
  }
}
