import {IGameRepository} from "./interface/game-repository";
import {IQueryService} from "./interface/query-service";
import {Game, Player} from "../domain/entity/Game";

export class PlayCard {
  private readonly gameRepository: IGameRepository
  private readonly qs: IQueryService;

  public constructor(gameRepository: IGameRepository, qs: IQueryService) {
    this.gameRepository = gameRepository;
    this.qs = qs;
  }

  public async play(playerId: string): Promise<Game> {
    const game = await this.qs.getGameInPlay(this.gameRepository.dealerId);

    if (!game) {
      throw new ReferenceError("There are no Game in play.");
    } else if (!game.players.some((player) => player.id === playerId)) {
      throw new ReferenceError("The player is not found.");
    } else if (game.players.some((player) => player.id === playerId && player.isPlayed)) {
      throw new ReferenceError("The player has already played.");
    } else {
      const player: Player = game.players.filter((player) => player.id === playerId)[0];
      player.setPlayed();
      game.judge();
      await this.gameRepository.save(game);
      return game;
    }
  }
}
