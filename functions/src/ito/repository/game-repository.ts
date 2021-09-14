import {IGameRepository} from "../usecase/interface/game-repository";
import {Game} from "../domain/entity/Game";
import {firestore} from "firebase-admin";
export class GameRepository implements IGameRepository {
  private db: FirebaseFirestore.Firestore
  public readonly dealerId: string
  public constructor(db: FirebaseFirestore.Firestore, dealerId: string) {
    this.db = db;
    this.dealerId = dealerId;
  }

  public async save(game: Game): Promise<void> {
    await this.db.collection("dealer").doc(this.dealerId).collection("games").doc(game.id).set({
      "thema": game.thema,
      "status": game.status,
      "createdAt": firestore.FieldValue.serverTimestamp(),
    }, {merge: true});

    // TODO: DBアクセスの繰り返し処理はあまり良くなさそう.設計を見直す.
    for (const player of game.players) {
      await this.db.collection("dealer").doc(this.dealerId)
          .collection("games").doc(game.id)
          .collection("players").doc(player.id)
          .set({
            "createdAt": firestore.FieldValue.serverTimestamp(),
          }, {merge: true});
      for (const card of player.cards) {
        await this.db.collection("dealer").doc(this.dealerId)
            .collection("games").doc(game.id)
            .collection("players").doc(player.id)
            .collection("cards").doc(card.id)
            .set({
              "card": card.card,
              "isPlayed": card.isPlayed,
            }, {merge: true});
      }
    }
  }
}
