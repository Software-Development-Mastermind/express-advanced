import React, { useEffect, useState } from 'react';
import './App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  BrowserRouter,
  Redirect
} from "react-router-dom";

import SplashContainer from './SplashContainer';
import HomeContainer from './HomeContainer';
import RegisterContainer from './RegisterContainer';
import Navbar from './Navbar';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem('todo-app-user')));

  useEffect(() => {
    const data = JSON.stringify(loggedInUser) || null;
    localStorage.setItem('todo-app-user', data);
  }, [loggedInUser]);

  const logoutUser = () => {
    localStorage.removeItem('todo-app-user');
    setLoggedInUser(null);
  }

  return (
    <>
      <Navbar loggedInUser={loggedInUser} logoutUser={logoutUser}/>     
      <BrowserRouter>
        <Switch>
          <Route path="/home" render={() => {
                return !loggedInUser
                  ? <Redirect to="/" />
                  : <HomeContainer loggedInUser={loggedInUser} />
              }}>
          </Route>
          <Route path="/register" render={() => {
                return loggedInUser
                  ? <Redirect to="/home" />
                  : <RegisterContainer/>
              }}>
          </Route>
          <Route path="/" render={() => {
                return loggedInUser
                  ? <Redirect to="/home" />
                  : <SplashContainer setLoggedInUser={setLoggedInUser}/>
              }}>
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
