import {Game, Player, Card, GameStatus} from "../entity/Game";
import {InvalidParameterError} from "../entity/errors";

import {v4 as uuid} from "uuid";

export class GameFactory {
  public create(props: { dealerId: string, playerNum: number, thema?: string, maxCard?: number }): Game {
    const id: string = uuid();
    // const dealerId: string = props.dealerId;
    const playerNum: number = props.playerNum;
    const thema: string = props.thema ?? this.generateThema();
    const cardNum = 1; // TODO: 一人あたりのカード枚数を選択できるようにする
    const minCard = 1; // NOTE: 最小値は1
    const maxCard: number = props.maxCard ?? 100;
    const status: GameStatus = "INPLAY"; // NOTE: Gameは必ずINPLAYで生成される

    this.validatePlayerNum(playerNum); // NOTE: 2 - 10 のみに制限
    this.validateMaxCard(maxCard); // NOTE: 10以上に制限

    const players: Player[] = this.generatePlayers(playerNum, cardNum, minCard, maxCard);

    return new Game({
      id: id,
      thema: thema,
      players: players,
      status: status,
    });
  }

  validatePlayerNum(playerNum: number): void {
    if (!(playerNum >= 2 && playerNum <= 10)) {
      throw new InvalidParameterError("Invalid number of player");
    }
  }

  validateMaxCard(maxCard: number): void {
    if (!(maxCard >= 10)) {
      throw new InvalidParameterError("Invalid number of max number");
    }
  }

  generateThema(): string {
    return "sample thema";
  }

  generatePlayers(playerNum: number, cardNum: number, minCard: number, maxCard: number): Player[] {
    const randoms: number[] = this.getRandomNumbers(playerNum, cardNum, minCard, maxCard);
    const cardSets: Card[][] = this.generateCards(cardNum, randoms);
    const players: Player[] = [];

    for (const cards of cardSets) {
      players.push(
          new Player({
            id: uuid(),
            cards: cards,
          })
      );
    }

    return players;
  }


  generateCards(cardNum: number, randoms: number[]): Card[][] {
    // NOTE:  [[Card(), Card(),...], [Card(), Card(),...],...]のような配列を生成する
    const cardSets: Card[][] = [];

    // TODO: 処理が冗長。テスト実装後にリファクタする。
    let cardSet: Card[] = [];
    for (const card of randoms) {
      cardSet.push(
          new Card({
            id: uuid(),
            card: card,
            isPlayed: false,
          })
      );
      if (cardSet.length === cardNum) {
        cardSets.push(cardSet);
        cardSet = [];
      }
    }

    return cardSets;
  }

  getRandomNumbers(playerNum: number, cardNum: number, minCard: number, maxCard: number): number[] {
    // NOTE: 重複しないようにplayerNum*cardNum個の乱数生成
    const randoms: number[] = [];
    for (let i = 0; i < playerNum*cardNum; i++) {
      let j = 0; // 無限ループを避けるため
      let num: number;
      while (j < 1000) {
        num = this.intRandom(minCard, maxCard);
        if (!randoms.includes(num)) {
          randoms.push(num);
          break;
        }
        j++;
      }
    }

    return randoms;
  }

  intRandom(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
