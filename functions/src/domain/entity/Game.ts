export class Game {
  public readonly id: string
  public readonly thema: string
  public readonly players: Player[]
  private _status: GameStatus

  public constructor(props: { id: string, thema: string, players: Player[], status: GameStatus}) {
    const {id, thema, players, status} = props;
    this.id = id;
    this.thema = thema;
    this.players = players;
    this._status = status;
  }

  get status(): GameStatus {
    return this._status;
  }
  public setQuit(): void {
    this._status = "QUIT";
  }
}

export type GameStatus = "INPLAY" | "OVER" | "SUCCESS" | "QUIT";

export class Player {
  public readonly id: string
  public readonly card: number
  public readonly isPlayed: boolean

  public constructor(props: {id: string, card: number, isPlayed: boolean}) {
    const {id, card, isPlayed} = props;
    this.id = id;
    this.card = card;
    this.isPlayed = isPlayed;
  }
}
