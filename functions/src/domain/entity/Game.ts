export class Game {
  private id: string
  private thema: string
  private players: string[]
  private status: GameStatus
  private history: string[]

  public constructor(props: {id: string, thema: string, players: string[], status: GameStatus, history: string[]}) {
    const {id, thema, players, status, history} = props;
    this.id = id;
    this.thema = thema;
    this.players = players;
    this.status = status;
    this.history = history;
  }
}

export type GameStatus = "INPLAY" | "OVER" | "SUCCESS" | "QUIT";
