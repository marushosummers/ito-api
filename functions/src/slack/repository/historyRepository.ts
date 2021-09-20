
import { firestore } from "firebase-admin";
import { PlayerMap } from "../domain/Channel";

export class HistoryRepository {
  private db: FirebaseFirestore.Firestore
  public constructor(db: FirebaseFirestore.Firestore) {
    this.db = db;
  }

  public async saveCreateGame(channelId: string, players: PlayerMap[]): Promise<void> {
    await this.db.collection("historyGame").add({
        "channelId": channelId,
        "createdAt": firestore.FieldValue.serverTimestamp(),
      });
  }

  public async savePlayGame(channelId: string, player: string): Promise<void> {
    await this.db.collection("historyPlay").add({
      "channelId": channelId,
      "createdAt": firestore.FieldValue.serverTimestamp(),
    });
  }
}

