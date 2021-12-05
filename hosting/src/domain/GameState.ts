export interface Game {
  id: string,
  thema: string,
  players: Player[],
  status: string
}

interface Player {
  id: string,
  cards: Card[]
}

interface Card {
  id: string,
  card: number,
  isPlayed: boolean
}
