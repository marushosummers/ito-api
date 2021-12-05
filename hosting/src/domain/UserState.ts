export type UserState = {
  uid: string;
  loginRoomId: string;
  room: Room;
};

export type Room = {
  id: string;
  name: string;
  createUser: string;
  hostUser: string;
  members: string[];
  isOpen: boolean;
  game: any[];
};

export const initialState = { uid: null, loginRoomId: null, room: null };
