import {IGameRepository} from "./interface/game-repository";

export class QuitGame {
  private readonly gameRepository: IGameRepository
  public constructor(gameRepository: IGameRepository) {
    this.gameRepository = gameRepository;
  }

  public async quit(props: { dealerId: string }): Promise<void> {
    // const {dealerId, playerNum, thema, minCard, maxCard} = props;
    // TODO: 既存のGameがあるかチェック
    // なければreturn
    // あればGameStatusをQuitにする
  }
}
