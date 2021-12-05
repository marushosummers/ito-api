import React, { useReducer, useState } from 'react';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { auth, firestore } from './firebase';
import { VFC } from 'react';
import { BrowserRouter, Link, Route, Switch, Redirect } from 'react-router-dom';
import NewRoom from './pages/NewRoom';
import Rooms from './pages/Rooms';
import createUser from './hooks/repository/createUser';
import searchUser from './hooks/repository/searchUser';
import { UserContext } from './context/userContext';
import { UserReducer } from './reducer/userReducer';
import { initialState } from './domain/UserState';
import Room from './pages/Room';

import { doc, onSnapshot } from "firebase/firestore";

export const App: VFC = () => {
  const [loading, setLoading] = useState(false)
  const [state, dispatch] = useReducer(UserReducer, initialState)

  React.useEffect(() => {
    setLoading(true)
    signInAnonymously(auth).catch(function(error) {
      console.log(`${error.code}, ${error.message}`);
    });

    const unsub = onAuthStateChanged(auth, async user => {
      console.log(user);
      let userState = await searchUser(user.uid);
      console.log('searchUser', userState);

      if (!userState) {
        await createUser(user.uid);
        console.log("createUser");
      }

      // TODO: hooksに切り出し
      const unsub = onSnapshot(doc(firestore, "users", user.uid), (doc) => {
        dispatch({
          type: 'setUser',
          payload: {
            uid: doc.id,
            loginRoomId: doc.data().loginRoomId,
          }
        });
      });

      setLoading(false)
      return unsub;
    });
    console.log(`useEffect!!!!!`);
    return unsub;
  }, []);

  return (
      <BrowserRouter>
        <UserContext.Provider value={{ state, dispatch }}>
        {!loading &&
          <div className='App'>
            <h2>ito</h2>
            {state ? `こんにちは ゲスト さん` : `ログインしていません`}
            <br />
            {state.loginRoomId ? `へや: ${state.loginRoomId}` : `部屋に参加していません`}
            <br />
            {!state.loginRoomId && <Link to="/room/new"> へや を つくる </Link>}
            <br />
            <Link to={state.loginRoomId ? `/room/${state.loginRoomId}` : '/room'}> へや に はいる </Link>
          </div>
        }
        <Switch>
          <Route exact path='/room'>
            {state.loginRoomId ? <Redirect push to="/" /> : <Rooms />}
          </Route>
          <Route exact path='/room/new' component={NewRoom} />
          <Route path='/room/:id' component={Room} />
          </Switch>
      </UserContext.Provider>
    </BrowserRouter>
);
}

export default App;

