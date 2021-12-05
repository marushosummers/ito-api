import {IGameRepository} from "../usecase/interface/game-repository";
import {Game} from "../domain/entity/Game";

export class GameRepository implements IGameRepository {
  private db: FirebaseFirestore.Firestore
  public readonly roomId: string
  public constructor(db: FirebaseFirestore.Firestore, roomId: string) {
    this.db = db;
    this.roomId = roomId;
  }

  public async save(game: Game): Promise<void> {
    await this.db.collection("rooms").doc(this.roomId).set({
      "game": game,
    }, {merge: true});
  }
}
