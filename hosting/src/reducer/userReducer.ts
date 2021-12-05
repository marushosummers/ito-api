import { UserState } from '../domain/UserState';

export type ActionType = {
  type: string;
  payload: any;
};

export const UserReducer = (state: UserState, action: ActionType): UserState => {
  switch (action.type) {
    case 'setUserId':
      return {
        ...state,
        uid: action.payload.uid
      };

    case 'setOutUserId':
      return {
        ...state,
        uid: null
      };

    case 'setUser':
      return {
        ...state,
        uid: action.payload.uid,
        loginRoomId: action.payload.loginRoomId,
      };

    case 'setRoom':
      return {
        ...state,
        room: { ...action.payload.room }
      };

    default:
      return {
        ...state
      };
  }
}

