
import {IDealerRepository} from "../usecase/interface/dealer-repository";
import {Dealer} from "../domain/entity/Dealer";

export class DealerRepository implements IDealerRepository {
  private db: FirebaseFirestore.Firestore
  public constructor(db: FirebaseFirestore.Firestore) {
    this.db = db;
  }

  public async create(dealer: Dealer): Promise<void> {
    await this.db.collection("dealer").doc(dealer.id).set({
      "type": dealer.type,
      "name": dealer.name,
    });
  }
}
