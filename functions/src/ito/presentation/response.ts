import {GameStatus} from "../domain/entity/Game";

export interface RoomResponse {
  roomId: string
}
export class GetOKResponse {
  status: ResponseStatus
  dealerId: string
  game: Game[]

  public constructor(params: { dealerId: string, game: Game|null }) {
    const {dealerId, game} = params;
    this.status = "OK";
    this.dealerId = dealerId;
    this.game = game ? [new Game({
      id: game.id,
      thema: game.thema,
      players: game.players,
      status: game.status,
      fieldCard: game.fieldCard,
    })] : []; // NOTE: nullなら空行列を返す
  }
}

export class GetErrorResponse {
  status: ResponseStatus
  message: string
  public constructor(params: { message: string}) {
    const {message} = params;
    this.status = "ERROR";
    this.message = message;
  }
}

type ResponseStatus = "OK" | "ERROR";

class Game {
  id: string
  thema: string
  players: Player[]
  status: GameStatus
  fieldCard: number

  public constructor(props: { id: string, thema: string, players: Player[], status: GameStatus, fieldCard: number }) {
    const {id, thema, players, status, fieldCard} = props;
    this.id = id;
    this.thema = thema;
    this.players = players.map((player) => new Player({
      id: player.id,
      cards: player.cards.map((card) => new Card({
        id: card.id,
        card: card.card,
        isPlayed: card.isPlayed,
      })),
    }));
    this.status = status;
    this.fieldCard = fieldCard;
  }
}


class Player {
  id: string
  cards: Card[]

  public constructor(props: { id: string, cards: Card[]}) {
    const {id, cards} = props;
    this.id = id;
    this.cards = cards;
  }
}

class Card {
  id: string
  card: number
  isPlayed: boolean

  public constructor(props: { id: string, card: number, isPlayed: boolean }) {
    const {id, card, isPlayed} = props;
    this.id = id;
    this.card = card;
    this.isPlayed = isPlayed;
  }
}
