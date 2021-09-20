
import {firestore} from "firebase-admin";

export class HistoryRepository {
  private db: FirebaseFirestore.Firestore
  public constructor(db: FirebaseFirestore.Firestore) {
    this.db = db;
  }

  public async saveCreateGame(props: {
    channelId: string
    createUserId: string,
    thema: string,
    players: string[],
    maxNum: number,
    handNum: number,
  }): Promise<void> {
    await this.db.collection("historyGame").add({
      "channelId": props.channelId,
      "createUserId": props.createUserId,
      "thema": props.thema,
      "players": props.players,
      "maxNum": props.maxNum,
      "handNum": props.handNum,
      "createdAt": firestore.FieldValue.serverTimestamp(),
    });
  }

  public async savePlayGame(props: { channelId: string, player: string }): Promise<void> {
    await this.db.collection("historyPlay").add({
      "channelId": props.channelId,
      "player": props.player,
      "createdAt": firestore.FieldValue.serverTimestamp(),
    });
  }
}

