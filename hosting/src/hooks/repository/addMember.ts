import { firestore } from '../../firebase'
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

const addMember = async (uid: string, roomId: string): Promise<void> => {
  try {
    const ref = doc(firestore, 'rooms', roomId);
    await updateDoc(ref, {
      members: arrayUnion(uid)
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }

}

export default addMember;
