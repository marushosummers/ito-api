export class Game {
  private id: string
  private thema: string
  private players: Player[]
  private status: GameStatus

  public constructor(props: { id: string, thema: string, players: Player[], status: GameStatus}) {
    const {id, thema, players, status} = props;
    this.id = id;
    this.thema = thema;
    this.players = players;
    this.status = status;
  }
}

export type GameStatus = "INPLAY" | "OVER" | "SUCCESS" | "QUIT";

class Player {
  public readonly id: string
  public readonly card: number
  public readonly isPlayed: Boolean

  public constructor(props: {id: string, card: number, isPlayed: Boolean}) {
    const { id, card, isPlayed } = props;
    this.id = id;
    this.card = card;
    this.isPlayed = isPlayed;
  }
}
