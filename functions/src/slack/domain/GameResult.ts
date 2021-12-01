export type GameResult = {
  id?: string,
  thema?: string,
  players?: Player[],
  status: "INPLAY" | "OVER" | "SUCCESS" | "QUIT" | "ERROR",
  fieldCard: number,
}

export type Player = {
  id: string,
  cards: Card[],
}

export type Card = {
  id: string,
  card: number,
  isPlayed: boolean,
}
