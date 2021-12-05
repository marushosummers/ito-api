import { UserState } from '../domain/UserState';

export type ActionType = {
  type: string;
  payload: UserState;
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
        ...action.payload
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

