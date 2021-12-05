import { firestore } from '../../firebase'
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const createUser = async (uid: string): Promise<void> => {
  try {
    await setDoc(doc(firestore, "users", uid), {
      timestamp: serverTimestamp()
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }

}

export default createUser
