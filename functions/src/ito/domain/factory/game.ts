import {Game, Player, Card, GameStatus} from "../entity/Game";
import {InvalidParameterError} from "../entity/errors";

import {v4 as uuid} from "uuid";

export class GameFactory {
  public create(props: { roomId: string, members: string[], thema?: string, maxCard?: number, handNum?: number }): Game {
    const id: string = uuid();
    // const dealerId: string = props.dealerId;
    const members = props.members;
    const playerNum: number = props.members.length;
    const thema: string = props.thema ?? this.generateThema();
    const handNum = props.handNum ?? 1; // 一人あたりのカード枚数
    const minCard = 1; // NOTE: 最小値は1
    const maxCard: number = props.maxCard ?? 100;
    const status: GameStatus = "INPLAY"; // NOTE: Gameは必ずINPLAYで生成される

    this.validateHandNum(playerNum); // NOTE: 1 - 5 のみに制限
    this.validatePlayerNum(playerNum); // NOTE: 2 - 9 のみに制限
    this.validateMaxCard(maxCard); // NOTE: 50以上に制限

    const players: Player[] = this.generatePlayers(members, handNum, minCard, maxCard);

    return new Game({
      id: id,
      thema: thema,
      players: players,
      status: status,
    });
  }

  validateHandNum(handNum: number): void {
    if (!(handNum >= 1 && handNum <= 5)) {
      throw new InvalidParameterError("Invalid number of Card");
    }
  }

  validatePlayerNum(playerNum: number): void {
    if (!(playerNum > 1 && playerNum <= 9)) {
      throw new InvalidParameterError("Invalid number of player");
    }
  }

  validateMaxCard(maxCard: number): void {
    if (!(maxCard >= 50)) {
      throw new InvalidParameterError("Invalid number of max number");
    }
  }

  generateThema(): string {
    return "行ってみたい国は？";
  }

  generatePlayers(members: string[], handNum: number, minCard: number, maxCard: number): Player[] {
    const randoms: number[] = this.getRandomNumbers(members.length, handNum, minCard, maxCard);
    const cardSets: Card[][] = this.generateCards(handNum, randoms);

    const players: Player[] = cardSets.map((cards: Card[], index: number) => {
      return new Player({id: members[index], cards: cards});
    });

    return players;
  }


  generateCards(handNum: number, randoms: number[]): Card[][] {
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
      if (cardSet.length === handNum) {
        cardSets.push(cardSet);
        cardSet = [];
      }
    }

    return cardSets;
  }

  getRandomNumbers(playerNum: number, handNum: number, minCard: number, maxCard: number): number[] {
    // NOTE: 重複しないようにplayerNum*handNum個の乱数生成
    const randoms: number[] = [];
    for (let i = 0; i < playerNum*handNum; i++) {
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
