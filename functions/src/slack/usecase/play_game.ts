import {GetOKResponse, GetErrorResponse} from "../../ito/presentation/response";
import {play} from "../../ito/presentation/internalApi";
import {ChannelRepository} from "../repository/channelRepository";
import {GameResult} from "../domain/GameResult";

export class PlayGame {
  private readonly channelId: string
  private _dealerId?: string
  private readonly channelRepository: ChannelRepository

  public constructor(channelId: string, channelRepository: ChannelRepository) {
    this.channelId = channelId;
    this.channelRepository = channelRepository;
  }

  get dealerId(): string|undefined {
    return this._dealerId;
  }

  public async setDealerId(): Promise<void> {
    try {
      const dealerId = await this.channelRepository.getDealerIdByChannelId(this.channelId);

      if (dealerId) {
        this._dealerId = dealerId;
      } else {
        throw new Error("No Game");
      }
    } catch (error) {
      throw new Error("No Game");
    }
  }

  public async play(props: { player: string }): Promise<GameResult> {
    try {
      const playerId = await this.channelRepository.getPlayerId(this.channelId, props.player);

      if (!this.dealerId || !playerId) {
        throw new Error("No Id");
      }
      const response = await play({
        dealerId: this.dealerId,
        playerId: playerId,
      });

      if (response instanceof GetErrorResponse) {
        throw new Error();
      }
      if (!response.game.length) {
        throw new Error();
      }

      return this.createResult(response);
    } catch {
      throw new Error("Fail to start Game");
    }
  }

  private createResult(response: GetOKResponse): GameResult {
    if (response.status === "ERROR") {
      return {"status": "ERROR", "fieldCard": 0};
    }

    if (response.game.length) {
      const game = response.game[0];
      return {"status": game.status, "fieldCard": game.fieldCard};
    } else {
      throw new Error("Invalid Result");
    }
  }
}
