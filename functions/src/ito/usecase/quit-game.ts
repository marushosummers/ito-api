import {IGameRepository} from "./interface/game-repository";
import {IQueryService} from "./interface/query-service";
import {Game} from "../domain/entity/Game";
export class QuitGame {
  private readonly gameRepository: IGameRepository
  private readonly qs: IQueryService;

  public constructor(gameRepository: IGameRepository, qs: IQueryService) {
    this.gameRepository = gameRepository;
    this.qs = qs;
  }

  public async quit(): Promise<Game | null> {
    const game = await this.qs.getGameInPlay(this.gameRepository.dealerId);

    if (game) {
      game.setQuit();
      await this.gameRepository.save(game);
      return game;
    } else {
      return null;
    }
  }
}
