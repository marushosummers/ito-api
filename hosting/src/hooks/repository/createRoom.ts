import { firestore } from '../../firebase'
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Room } from '../../domain/UserState';

const createRoom = async(uid: string, name: string): Promise<Room|void> => {

  try {
    const docRef = await addDoc(collection(firestore, "rooms"), {
      name: name,
      createUser: uid,
      hostUser: uid,
      member: [],
      timestamp: serverTimestamp(),
    });
    console.log("Document written with ID: ", docRef.id);
    const room: Room = {
      id: docRef.id,
      name: name,
      createUser: uid,
      hostUser: uid,
      member: [],
    }
    return room
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export default createRoom
