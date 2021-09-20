export class HistoryPlay {
  public readonly channelId: string;
  public readonly player: string;

  public constructor(props: { channelId: string, player: string}) {
    const {channelId, player} = props;
    this.channelId = channelId;
    this.player = player;
  }
}
