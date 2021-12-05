import { useEffect, useState } from "react";
import fetchOpenRooms from "../hooks/repository/fetchOpenRooms";
import RoomCard from "../components/presentationals/RoomCard";

export function Rooms() {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const rooms = await fetchOpenRooms();
      setRooms(rooms);
    };
    fetch();
  }, []);

  return (
    <>
        {rooms.map(room => {
          return (
            <div key= { room.id } >
              <RoomCard room ={ room }/>
            </div>
            )
          })
        }
    </>
  );
}

export default Rooms;
