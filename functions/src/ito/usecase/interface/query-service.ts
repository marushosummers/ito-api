import {Game} from "../../domain/entity/Game";

export interface IQueryService {
  getGameInPlay(roomId: string): Promise<Game | null>
}
