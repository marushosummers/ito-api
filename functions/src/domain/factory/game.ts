import {Game, Player, GameStatus} from "../entity/Game";

import {v4 as uuid} from "uuid";

export class GameFactory {
  public create(props: { dealerId: string, playerNum: number, thema?: string, maxCard?: number }): Game {
    const id: string = uuid();
    // const dealerId: string = props.dealerId;
    const playerNum: number = props.playerNum;
    const thema: string = props.thema ?? this.generateThema();
    const minCard = 1; // NOTE: 最小値は1
    const maxCard: number = props.maxCard ?? 100;
    const status: GameStatus = "INPLAY"; // NOTE: Gameは必ずINPLAYで生成される

    this.validatePlayerNum(playerNum); // NOTE: 2 - 10 のみに制限
    this.validateMaxCard(maxCard); // NOTE: 10以上に制限

    const players: Player[] = this.generatePlayers(playerNum, minCard, maxCard);

    return new Game({
      id: id,
      thema: thema,
      players: players,
      status: status,
    });
  }

  validatePlayerNum(playerNum: number): void {
    if (!(playerNum >= 2 && playerNum <= 10)) {
      throw new Error;
    }
  }

  validateMaxCard(maxCard: number): void {
    if (!(maxCard >= 10)) {
      throw new Error;
    }
  }

  generateThema(): string {
    return "sample thema";
  }

  generatePlayers(playerNum: number, minCard: number, maxCard: number): Player[] {
    const randoms: number[] = this.getRandomNumbers(playerNum, minCard, maxCard);
    const players: Player[] = [];

    for (const card of randoms) {
      players.push(
          new Player({
            id: uuid(),
            card: card,
            isPlayed: false,
          })
      );
    }

    return players;
  }

  getRandomNumbers(playerNum: number, minCard: number, maxCard: number): number[] {
    // NOTE: 重複しないように乱数生成
    const randoms: number[] = [];
    for (let i = 0; i < playerNum; i++) {
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
