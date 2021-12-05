import { firestore } from '../../firebase'
import { getDocs, query, collection, where } from "firebase/firestore";
import { Room } from '../../domain/UserState';

const fetchOpenRooms = async (): Promise<Room[]> => {
  try {
    const rooms: Room[] = [];

    const q = query(collection(firestore, "rooms"), where("isOpen", "==", true));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      rooms.push({
        id: doc.id,
        name: doc.data().name,
        createUser: doc.data().createUser,
        hostUser: doc.data().hostUser,
        members: doc.data().members,
        isOpen: doc.data().isOpen,
        game: doc.data().game,
      });
    });

    return rooms;
  } catch (e) {
    console.log(e);
  };
}

export default fetchOpenRooms;
