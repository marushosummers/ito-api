import { firestore } from '../../firebase'
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const updateUser = async (uid: string, loginRoomId: string): Promise<void> => {
  try {
    await setDoc(doc(firestore, "users", uid), {
      loginRoomId: loginRoomId,
      timestamp: serverTimestamp()
    }, { merge: true });
  } catch (e) {
    console.error("Error adding document: ", e);
  }

}

export default updateUser;
