import {Dealer} from "../../domain/entity/Dealer";
import {Game} from "../../domain/entity/Game";

export interface IQueryService {
  getDealerById(dealerId: string): Promise<Dealer | null>
  getDealerByName(dealerName: string): Promise<Dealer | null>
  getGameInPlay(dealerId: string): Promise<Game | null>
}
