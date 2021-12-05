import { firestore } from '../../firebase'
import { doc, getDoc } from "firebase/firestore";
import { UserState } from '../../domain/UserState';

const searchUser = async (uid: string): Promise<any> => {
  const docRef = doc(firestore, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const user: UserState = {
      uid: docSnap.id,
      loginRoomId: docSnap.data().loginRoomId,
      room: null
    };
    return user;
  } else {
    console.log("No such document!");
  }
};

export default searchUser;
