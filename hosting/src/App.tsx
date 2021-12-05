import React, { useReducer } from 'react';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { auth } from './firebase';
import { VFC } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import NewRoom from './components/pages/NewRoom';
import Room from './components/pages/Room';
import createUser from './hooks/repository/createUser';
import searchUser from './hooks/repository/searchUser';
import { UserContext } from './context/userContext';
import { UserReducer } from './reducer/userReducer';
import { initialState } from './domain/UserState';

export const App: VFC = () => {
  const [state, dispatch] = useReducer(UserReducer, initialState)

  React.useEffect(() => {
    signInAnonymously(auth).catch(function(error) {
      console.log(`${error.code}, ${error.message}`);
    });

    onAuthStateChanged(auth, async user => {
      console.log(user);
      let userState = await searchUser(user.uid);
      console.log('searchUser', userState);
      if (!userState) {
        await createUser(user.uid);
        userState = { uid: user.uid }
        console.log("createUser", userState);
      }
      dispatch({ type: 'setUserId', payload: userState });
    });
  }, []);

  return (
      <BrowserRouter>
        <UserContext.Provider value={{ state, dispatch }}>
          <div className='App'>
            <h2>ito</h2>
            {state ? `こんにちは ゲスト さん` : `ログインしていません`}
            <br />
            {state.room?.id ? `へや: ${state.room.id}` : `部屋に参加していません`}
          </div>
          <Link to="/room/new"> へや を つくる </Link>
          <br />
          <Link to="/room"> へや に はいる </Link>

          <Switch>
            <Route exact path='/room'>
              <Room />
            </Route>
            <Route exact path='/room/new'>
              <NewRoom />
            </Route>
              </Switch>
      </UserContext.Provider>
    </BrowserRouter>
);
}

export default App;

