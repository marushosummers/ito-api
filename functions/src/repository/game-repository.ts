
import {IGameRepository} from "../usecase/interface/game-repository";
import {Game} from "../domain/entity/Game";

export class GameRepository implements IGameRepository {
  private db: FirebaseFirestore.Firestore
  private dealerId: string
  public constructor(db: FirebaseFirestore.Firestore, dealerId: string) {
    this.db = db;
    this.dealerId = dealerId;
  }

  public async create(game: Game): Promise<void> {
    await this.db.collection("dealer").doc(this.dealerId).collection("games").doc(game.id).set({
      "thema": game.thema,
      "status": game.status,
    });

    // NOTE: DBアクセスの繰り返し処理はあまり良くなさそう................................
    for (const player of game.players) {
      await this.db.collection("dealer").doc(this.dealerId).collection("games").doc(game.id).collection("players").doc(player.id).set({
        "card": player.card,
        "isPlayed": player.isPlayed,
      });
    }
  }
}
