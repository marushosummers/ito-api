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
  member: string[];
  isOpen: boolean;
};

export const initialState = { uid: null, loginRoomId: null, room: null };
