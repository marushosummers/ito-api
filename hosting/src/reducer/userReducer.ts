import { UserState } from '../domain/UserState';

export type ActionType = {
  type: string;
  payload: any;
};

export const UserReducer = (state: UserState, action: ActionType): UserState => {
  switch (action.type) {
    case 'setUser':
      return {
        ...state,
        user: action.payload.user,
        loading: false,
      };

    case 'deleteUser':
      return {
        ...state,
        user: null,
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

