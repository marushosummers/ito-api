import {Game} from "../domain/entity/Game";
import {GameFactory} from "../domain/factory/game";
import {IGameRepository} from "./interface/game-repository";

export class CreateGame {
  private readonly gameRepository: IGameRepository
  public constructor(gameRepository: IGameRepository) {
    this.gameRepository = gameRepository;
  }

  public async create(props: { dealerId: string, playerNum: number, thema?: string, minCard?: number, maxCard?: number}): Promise<Game> {
    // const {dealerId, playerNum, thema, minCard, maxCard} = props;
    // TODO: 既存のGameがあるかチェック
    const gameFactory = new GameFactory();
    const game = gameFactory.create({...props});
    await this.gameRepository.save(game);
    return game;
  }
}
