
import {IQueryService} from "../usecase/interface/query-service";
import {Game, Player, Card, GameStatus} from "../domain/entity/Game";

export class QueryService implements IQueryService {
  private db: FirebaseFirestore.Firestore
  public constructor(db: FirebaseFirestore.Firestore) {
    this.db = db;
  }

  public async getGameInPlay(roomId: string): Promise<Game | null> {
    const roomDoc = await this.db.collection("rooms").doc(roomId).get();
    if (!roomDoc.exists) {
      return null;
    } else {
      // TODO: gameDTOを作成する
      const game = roomDoc.get("game");
      const players: Player[] = [];

      const gameId = game.id;
      const gameThema = game.thema;
      const gameStatus = game.status;
      const gamePlayers = game.players;

      for await (const gamePlayer of gamePlayers) {
        const cards = [];
        const gameCards = gamePlayer.cards;
        for await (const gameCard of gameCards) {
          cards.push(new Card({id: gameCard.id, card: gameCard.card, isPlayed: gameCard.isPlayed}));
        }
        players.push(new Player({id: gamePlayer.id, cards: cards}));
      }
      return new Game({id: gameId, thema: gameThema, players: players, status: gameStatus});
    }
  }
}
