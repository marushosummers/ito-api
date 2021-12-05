import { createRoomFunction } from "../firebase";

const createRoom = async (): Promise<any> => {
  createRoomFunction().then((result) => {
    const data: any = result.data;
    return data.roomId;
  })
}

export default createRoom

