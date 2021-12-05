
import {IQueryService} from "../usecase/interface/query-service";
import {Game, Player, Card, GameStatus} from "../domain/entity/Game";

export class QueryService implements IQueryService {
  private db: FirebaseFirestore.Firestore
  public constructor(db: FirebaseFirestore.Firestore) {
    this.db = db;
  }

  public async getGameInPlay(dealerId: string): Promise<Game | null> {
    const snapshot = await this.db.collection("dealer").doc(dealerId).collection("games").where("status", "==", "INPLAY").limit(1).get();
    if (snapshot.empty) {
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
          const cardsCollection = await playerDoc.ref.collection("cards").get();
          const cards: Card[] = [];
          for await (const cardDoc of cardsCollection.docs) {
            cards.push(new Card({id: cardDoc.id, card: cardDoc.data().card, isPlayed: cardDoc.data().isPlayed}));
          }
          players.push(new Player({id: playerDoc.id, cards: cards}));
        }
      }
      return new Game({id: gameId, thema: gameThema, players: players, status: gameStatus});
    }
  }
}
