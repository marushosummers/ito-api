import React from 'react';
import { signInAnonymously } from 'firebase/auth';
import { auth } from './firebase';
import { VFC } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import NewRoom from './pages/NewRoom';
import Rooms from './pages/Rooms';
import { UserProvider } from './context/userContext';
import Room from './pages/Room';
import Home from './components/presentationals/Home';
import PrivateRoute from './router/PrivateRoute';

export const App: VFC = () => {

  React.useEffect(() => {
    signInAnonymously(auth).catch(function(error) {
      console.log(`${error.code}, ${error.message}`);
    });
    console.log(`useEffect!!!!!`);
  }, []);

  return (
    <UserProvider>
      <div>
        <BrowserRouter>
          <div className='App'>
              <h2>ito</h2>
            <div>
              <Link to="/room/new"> へや を つくる </Link>
              </div>
            <div>
              <Link to="/room"> へや に はいる </Link>
            </div>
          </div>
          <Switch>
            <Route exact path='/' component={Home} />
            <PrivateRoute exact path='/room' component={Rooms} />
            <PrivateRoute exact path='/room/new' component={NewRoom} />
            <PrivateRoute path='/room/:id' component={Room} />
            </Switch>
        </BrowserRouter>
      </div>
    </UserProvider>
);
}

export default App;

