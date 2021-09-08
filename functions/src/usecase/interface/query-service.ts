import {Game} from "../../domain/entity/Game";

export interface IQueryService {
  getGameInPlay(dealerId: string): Promise<Game | null>
}
