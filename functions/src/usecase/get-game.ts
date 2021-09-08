import {Game} from "../domain/entity/Game";
import {IQueryService} from "./interface/query-service";

export class GetGame {
  private readonly qs: IQueryService
  public constructor(qs: IQueryService) {
    this.qs = qs;
  }

  public async getInPlay(props: { dealerId: string }): Promise<Game | null> {
    return await this.qs.getGameInPlay(props.dealerId);
  }
}
