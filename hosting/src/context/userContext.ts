import React, { createContext } from 'react';

export const UserContext = createContext({} as {
  state: any;
  dispatch: React.Dispatch<React.SetStateAction<any>>;
});
