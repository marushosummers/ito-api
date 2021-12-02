import React from 'react';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { auth } from './firebase';

export default function App() {
 const [user, setUser] = React.useState(null);

 React.useEffect(() => {
   signInAnonymously(auth).catch(function(error) {
     console.log(`${error.code}, ${error.message}`);
   });
 
   onAuthStateChanged(auth, user => {
     console.log(user);
    setUser(user);
  });

 }, []);

 return (
     <div className='App'>
       <div className='App-header'>
         { user ? `こんにちは ゲスト さん` : `ログインしていません`}
         <h2>ito</h2>
       </div>
     </div>
 );
}
