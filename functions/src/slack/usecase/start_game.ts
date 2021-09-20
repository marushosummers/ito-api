import {GetOKResponse, GetErrorResponse} from "../../ito/presentation/response";
import {signup, create} from "../../ito/presentation/internalApi";
import {ChannelRepository} from "../repository/channelRepository";
import {PlayerMap} from "../domain/Channel";

export class StartGame {
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
        const response = await signup({type: "slack", name: this.channelId});
        if (response instanceof GetOKResponse) {
          this._dealerId = response.dealerId;
          await this.channelRepository.createChannel(this.channelId, this._dealerId);
        } else {
          throw new Error("Fail to create channel");
        }
      }
    } catch (error) {
      throw new Error("Fail to create channel");
    }
  }

  public async start(props: { thema: string, players: string[], maxNum: number, handNum: number }): Promise<PlayerMap[]> {
    const playerNum = props.players.length;
    const thema = props.thema;
    const maxCard = props.maxNum;
    const handNum = props.handNum;

    try {
      if (!this.dealerId) {
        throw new Error("No Dealer Id");
      }
      const response = await create({
        dealerId: this.dealerId,
        playerNum: playerNum,
        thema: thema,
        maxCard: maxCard,
        handNum: handNum,
      });

      if (response instanceof GetErrorResponse) {
        throw new Error();
      }
      if (!response.game.length) {
        throw new Error();
      }

      const game = response.game[0];

      // playerMapの保存
      const playerSlackIds = props.players;
      const playerMaps: PlayerMap[] = playerSlackIds.map((slackId, index) => {
        return {"id": slackId, "itoId": game.players[index].id, "cards": game.players[index].cards.map((card) => card.card)};
      });
      await this.channelRepository.savePlayers(this.channelId, playerMaps);

      return playerMaps;
    } catch {
      throw new Error("Fail to start Game");
    }
  }
}

