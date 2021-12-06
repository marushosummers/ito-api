export type UserState = {
  user: any;
  loading: boolean;
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

export const initialState = { user: null, loading: true, room: null };
