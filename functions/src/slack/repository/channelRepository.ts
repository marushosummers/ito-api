
import {firestore} from "firebase-admin";
import {PlayerMap} from "../domain/Channel";

export class ChannelRepository {
  private db: FirebaseFirestore.Firestore
  public constructor(db: FirebaseFirestore.Firestore) {
    this.db = db;
  }

  public async createChannel(channelId: string, dealerId: string): Promise<void> {
    await this.db.collection("channels").doc(channelId).set({
      "dealerId": dealerId,
      "createdAt": firestore.FieldValue.serverTimestamp(),
    });
  }

  public async savePlayers(channelId: string, players: PlayerMap[]): Promise<void> {
    for (const player of players) {
      await this.db.collection("channels").doc(channelId)
          .collection("players").doc(player.id)
          .set({
            "itoId": player.itoId,
            "createdAt": firestore.FieldValue.serverTimestamp(),
          }, {merge: true});
    }
  }

  public async getDealerIdByChannelId(channelId: string): Promise<string|null> {
    const snapshot = await this.db.collection("channels").doc(channelId).get();
    const data = snapshot.data();
    if (!snapshot.exists || !data) {
      return null;
    } else {
      return data.dealerId;
    }
  }

  public async getPlayerIdMapByChannelId(channelId: string): Promise<PlayerMap[]> {
    const playerMap: PlayerMap[] = [];
    const playersCollection = await this.db.collection("channels").doc(channelId).collection("players").get();

    playersCollection.forEach((player) => {
      playerMap.push({"id": player.id, "itoId": player.data().itoId});
    });
    return playerMap;
  }
}

