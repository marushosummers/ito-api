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
    const playedCards = this.getPlayedCards();
    const notPlayedCards = this.getNotPlayedCards();

    if (!playedCards.length || !notPlayedCards.length) {
      // 誰もカードを出してない/全員がカードを出している状態でのジャッジはされない想定
      throw Error("Unexpected error");
    }

    const minNotPlayedCard: number = Game.getMinCard(notPlayedCards).card;
    const maxPlayedCard: number = Game.getMaxCard(playedCards).card;

    if (maxPlayedCard < minNotPlayedCard) {
      if (notPlayedCards.length === 1) {
        // 最後の一人になったら成功
        this._status = "SUCCESS";
      } else {
        // 今まで出したカードの最大値が、出していないカードの最小値より小さいのでゲーム続行
        this._status = "INPLAY";
      }
    } else if (maxPlayedCard > minNotPlayedCard) {
      this._status = "OVER";
    } else {
      throw Error("Unexpected error");
    }
  }

  private getPlayedCards(): Card[] {
    return this.players.map((player) => player.cards).reduce((prev, cards) => prev.concat((cards.filter((card) => card.isPlayed))), []);
  }

  private getNotPlayedCards(): Card[] {
    return this.players.map((player) => player.cards).reduce((prev, cards) => prev.concat((cards.filter((card) => !card.isPlayed))), []);
  }


  private static getMinCard(players: Card[]): Card {
    return players.reduce((prev, current) => ((prev.card < current.card) ? prev : current));
  }

  private static getMaxCard(players: Card[]): Card {
    return players.reduce((prev, current) => ((prev.card > current.card) ? prev : current));
  }
}

export type GameStatus = "INPLAY" | "OVER" | "SUCCESS" | "QUIT";

export class Player {
  public readonly id: string
  public readonly cards: Card[]

  public constructor(props: {id: string, cards: Card[]}) {
    const {id, cards} = props;
    this.id = id;
    this.cards = cards;
  }
}

export class Card {
  public readonly id: string
  public readonly card: number
  private _isPlayed: boolean

  public constructor(props: { id: string, card: number, isPlayed: boolean }) {
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
