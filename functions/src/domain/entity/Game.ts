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

  public judge(): void {
    const playedPlayers = this.getPlayedPlayers();
    const notPlayedPlayers = this.getNotPlayedPlayers();

    if (!playedPlayers.length || !notPlayedPlayers.length) {
      // 誰もカードを出してない/全員がカードを出している状態でのジャッジはされない想定
      throw Error("Unexpected error");
    }

    const minNotPlayedNumber: number = Game.getMinCardPlayer(notPlayedPlayers).card;
    const maxPlayedNumber: number = Game.getMinCardPlayer(playedPlayers).card;

    if (maxPlayedNumber < minNotPlayedNumber) {
      // 今まで出したカードの最大値が、出していないカードの最小値より小さいのでゲーム続行
      this._status = "INPLAY";
    } else if (maxPlayedNumber > minNotPlayedNumber) {
      this._status = "OVER";
    } else {
      throw Error("Unexpected error");
    }

    if (notPlayedPlayers.length === 1) {
      // 最後の一人になったら成功
      this._status = "SUCCESS";
    }
  }

  private getPlayedPlayers(): Player[] {
    return this.players.filter((player) => player.isPlayed);
  }

  private getNotPlayedPlayers(): Player[] {
    return this.players.filter((player) => !player.isPlayed);
  }

  private static getMinCardPlayer(players: Player[]): Player {
    return players.reduce((prev, current) => ((prev.card < current.card) ? prev : current));
  }

  private static getMaxCardPlayer(players: Player[]) {
    return players.reduce((prev, current) => ((prev.card < current.card) ? prev : current));
  }
}

export type GameStatus = "INPLAY" | "OVER" | "SUCCESS" | "QUIT";

export class Player {
  public readonly id: string
  public readonly card: number
  private _isPlayed: boolean

  public constructor(props: {id: string, card: number, isPlayed: boolean}) {
    const {id, card, isPlayed} = props;
    this.id = id;
    this.card = card;
    this._isPlayed = isPlayed;
  }

  get isPlayed(): boolean {
    return this._isPlayed;
  }
  public setPlayed(): void {
    this._isPlayed = true;
  }
}

