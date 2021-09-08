
import {IQueryService} from "../usecase/interface/query-service";
import {Game, Player, GameStatus} from "../domain/entity/Game";

export class QueryService implements IQueryService {
  private db: FirebaseFirestore.Firestore
  public constructor(db: FirebaseFirestore.Firestore) {
    this.db = db;
  }

  public async getGameInPlay(dealerId: string): Promise<Game | null> {
    const snapshot = await this.db.collection("dealer").doc(dealerId).collection("games").where("status", "==", "INPLAY").limit(1).get();
    if (snapshot.empty) {
      console.log("No such document!");
      return null;
    } else {
      // TODO: gameDTOを作成する
      let gameId = "";
      let gameThema = "";
      let gameStatus: GameStatus = "INPLAY";
      const players: Player[] = [];

      for await (const gameDoc of snapshot.docs) {
        gameId = gameDoc.id;
        gameThema = gameDoc.data().thema;
        gameStatus = gameDoc.data().status;

        const playersCollection = await gameDoc.ref.collection("players").get();
        for await (const playerDoc of playersCollection.docs) {
          players.push(new Player({id: playerDoc.id, card: playerDoc.data().card, isPlayed: playerDoc.data().isPlayed}));
        }
      }
      return new Game({id: gameId, thema: gameThema, players: players, status: gameStatus});
    }
  }
}

