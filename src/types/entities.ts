export type Player = {
  id: number | string
  name: string
  password: string
  wins: number
}

export type GameRoom = {
  roomId: string
  roomUsers: Player[]
}

export type Game = {
  gameId: number | string
  players: { [key: string]: PlayerInGame }
  currentPlayer: number | string
}

export type PlayerInGame = {
  id: number | string
  ships: Ship[]
  hits: number
}

export type Ship = {
  position: Position
  direction: boolean
  length: number
  type: 'small' | 'medium' | 'large' | 'huge'
  health: number
}

export type Position = {
  x: number
  y: number
}

export type Message = {
  type: string
  data: any
  id: number
}
