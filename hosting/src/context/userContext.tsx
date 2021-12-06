import React, { createContext, useContext, useEffect, useReducer  } from 'react';
import { initialState } from '../domain/UserState';
import { auth } from '../firebase';
import { UserReducer } from '../reducer/userReducer';

export const UserContext = createContext({} as {
  state: any;
  dispatch: React.Dispatch<React.SetStateAction<any>>;
});

export function useUserContext() {
  return useContext(UserContext);
};

export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(UserReducer, initialState)

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      console.log('user state changed', user);
      dispatch({
        type: 'setUser',
        payload: {
          user: user
        }
      });
    });
    return () => {
      unsubscribed();
    };
  }, []);

  return <UserContext.Provider value={{ state, dispatch }}> {!state.loading && children} </UserContext.Provider>;
}
