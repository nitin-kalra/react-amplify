import React, { useState, useEffect } from 'react';
import './App.css';
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignIn, } from '@aws-amplify/ui-react';
import { onAuthUIStateChange, AuthState } from '@aws-amplify/ui-components'

import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import Home from './home'

const signInFields = [
  {
    type: "email",
    label: "Email",
    placeholder: "Please enter your Email",
    required: true,
  },
  {
    type: "password",
    label: "Password",
    placeholder: "Please enter your Password",
    required: true,
  },
];
const signUpFields = [
  {
    type: "username",
    label: "Username",
    placeholder: "Please enter your Username Test",
    required: true,
  },
  {
    type: "email",
    label: "Email",
    placeholder: "Please enter your Email",
    required: true,
  },
  {
    type: "password",
    label: "Password",
    placeholder: "Please enter your Password",
    required: true,
  },
];

const App = () => {

 const [authState, setAuthState] = useState()
 const [user, setUser] = useState({})

 useEffect(() => {
  return onAuthUIStateChange((nextAuthState, authData) => {
    console.log(authData);
    setAuthState(nextAuthState);
    setUser(authData);
  });
}, []);

return authState === AuthState.SignedIn && user ? (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </BrowserRouter>
      ) :
      (<AmplifyAuthenticator usernameAlias="email">
        <AmplifySignUp
                headerText="Sign Up"
                slot="sign-up"
                usernameAlias="email"
                formFields={signUpFields}>
        </AmplifySignUp>'
          <AmplifySignIn
                headerText="Log in to Dashboard"
                slot="sign-in"
                usernameAlias="email"
                formFields={signInFields}>
        </AmplifySignIn>
      </AmplifyAuthenticator>
    );

}

export default App;
