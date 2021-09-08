import {Game} from "../domain/entity/Game";
import {GameFactory} from "../domain/factory/game";
import {IGameRepository} from "./interface/game-repository";
import {IQueryService} from "./interface/query-service";
export class CreateGame {
  private readonly gameRepository: IGameRepository
  private readonly qs: IQueryService;

  public constructor(gameRepository: IGameRepository, qs: IQueryService) {
    this.gameRepository = gameRepository;
    this.qs = qs;
  }

  public async create(props: { dealerId: string, playerNum: number, thema?: string, maxCard?: number }): Promise<Game> {
    // NOTE: 既存のGameがあればquitしておく
    // このロジックはDomainに寄せたほうが良い...?
    const game = await this.qs.getGameInPlay(this.gameRepository.dealerId);
    if (game) {
      game.setQuit();
      await this.gameRepository.save(game);
    }

    const gameFactory = new GameFactory();
    const newGame = gameFactory.create({...props});
    await this.gameRepository.save(newGame);
    return newGame;
  }
}
