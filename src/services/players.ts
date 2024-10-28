interface Player {
  id: string
  name: string
  password: string
}

export class PlayerService {
  private players: Player[] = []

  registerPlayer(name: string, password: string, id: string) {
    if (this.players.find((p) => p.name === name)) {
      return {
        name,
        index: null,
        error: true,
        errorText: 'Player already exists',
      }
    }

    const newUserData = { name, password, id }

    this.players = [...this.players, newUserData]
    return { name, index: id, error: false, errorText: '' }
  }

  getPlayerByName(name: string) {
    return this.players.find((p) => p.name === name)
  }

  getPlayerById(id: string) {
    return this.players.find((p) => p.id === id)
  }

  removePlayer(name: string) {
    this.players = this.players.filter((p) => p.name !== name)
  }
}
