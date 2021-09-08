import {Game, Player, GameStatus} from "../entity/Game";

import {uuid} from "uuidv4";

export class GameFactory {
  public create(props: { dealerId: string, playerNum: number, thema?: string, minCard?: number, maxCard?: number }): Game {
    const id: string = uuid();
    const dealerId: string = props.dealerId;
    const playerNum: number = props.playerNum;
    const thema: string = props.thema ?? this.generateThema();
    const minCard: number = props.minCard ?? 1; // NOTE: デフォルトで最小値は1
    const maxCard: number = props.maxCard ?? 100; // NOTE: デフォルトで最大値は100
    const status: GameStatus = "INPLAY"; // NOTE: Gameは必ずINPLAYで生成される

    // TODO: Dealerが重複しないかチェック
    console.log(dealerId);

    const players: Player[] = this.generatePlayers(playerNum, minCard, maxCard);

    return new Game({
      id: id,
      thema: thema,
      players: players,
      status: status,
    });
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
      let j = 0;
      let tmp: number;
      while (j < 10000000000) {
        tmp = this.intRandom(minCard, maxCard);
        if (!randoms.includes(tmp)) {
          randoms.push(tmp);
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
