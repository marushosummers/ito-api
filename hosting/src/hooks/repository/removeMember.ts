import { firestore } from '../../firebase'
import { doc, updateDoc, arrayRemove } from "firebase/firestore";

const removeMember = async (uid: string, roomId: string): Promise<void> => {
  try {
    const ref = doc(firestore, 'rooms', roomId);
    await updateDoc(ref, {
      members: arrayRemove(uid)
    });
  } catch (e) {
    console.error("Error removeing document: ", e);
  }

}

export default removeMember;
