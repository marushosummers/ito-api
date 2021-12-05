export type UserState = {
  uid: string;
  room: Room;
};

export type Room = {
  id: string;
  name: string;
  createUser: string;
  hostUser: string;
  member: string[];
};

export const initialState = { uid: null, room: null };
