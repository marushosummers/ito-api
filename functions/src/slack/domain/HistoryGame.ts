export class HistoryGame {
  public readonly channelId: string;
  public readonly createUserId: string;
  public readonly thema: string;
  public readonly players: string[];
  public readonly maxNum: number;
  public readonly handNum: number;

  public constructor(props: { channelId: string, createUserId: string, thema: string, players: string[], maxNum: number, handNum: number }) {
    const {channelId, createUserId, thema, players, maxNum, handNum} = props;
    this.channelId = channelId;
    this.createUserId = createUserId;
    this.thema = thema;
    this.players = players;
    this.maxNum = maxNum;
    this.handNum = handNum;
  }
}
