import React, { useContext } from 'react';
import * as firebase from 'firebase/app';
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router';

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useContext(userContext);

   const location=useLocation();
   const history=useHistory();
   const { from } = location.state || { from: { pathname: "/" } };

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
  }
  const handleGoogleSignin = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        const { displayName, email } = result.user;
        const signInUser = { name: displayName, email }
        setLoggedInUser(signInUser)
        history.replace(from);

        console.log(result)
      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  }
  return (
    <div>
      <h1>This is Login</h1>
      <button onClick={handleGoogleSignin}>Google sign in</button>
    </div>
  );
};

export default Login;