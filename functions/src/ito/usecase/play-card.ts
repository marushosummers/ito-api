import {IGameRepository} from "./interface/game-repository";
import {IQueryService} from "./interface/query-service";
import {Game, Player, Card} from "../domain/entity/Game";
import {NotFoundError} from "../domain/entity/errors";

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
      throw new NotFoundError("There are no Games in play.");
    }

    const player: Player | undefined = game.players.filter((player) => player.id === playerId)[0];
    if (!player) {
      throw new NotFoundError("The player is not found.");
    }

    const cards: Card[] | undefined = player.cards.filter((card) => !card.isPlayed);
    if (!cards.length) {
      throw new NotFoundError("The player have no cards.");
    }

    const card: Card = cards.reduce((prev, current) => ((prev.card < current.card) ? prev : current));
    card.setPlayed();
    game.judge();
    await this.gameRepository.save(game);
    return game;
  }
}
