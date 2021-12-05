
import {IRoomRepository} from "../usecase/interface/room-repository";
import {Room} from "../domain/entity/Room";
import {firestore} from "firebase-admin";

export class RoomRepository implements IRoomRepository {
  private db: FirebaseFirestore.Firestore
  public constructor(db: FirebaseFirestore.Firestore) {
    this.db = db;
  }

  public async create(room: Room): Promise<void> {
    await this.db.collection("room").doc(room.id).set({
      "uid": room.uid,
      "type": room.type,
      "createdAt": firestore.FieldValue.serverTimestamp(),
    });
  }
}
