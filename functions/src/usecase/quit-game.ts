import {IGameRepository} from "./interface/game-repository";
import {IQueryService} from "./interface/query-service";
export class QuitGame {
  private readonly gameRepository: IGameRepository
  private readonly qs: IQueryService;

  public constructor(gameRepository: IGameRepository, qs: IQueryService) {
    this.gameRepository = gameRepository;
    this.qs = qs;
  }

  public async quit(): Promise<void> {
    const game = await this.qs.getGameInPlay(this.gameRepository.dealerId);

    if (game) {
      await this.gameRepository.quit(game.id);
    }
  }
}
