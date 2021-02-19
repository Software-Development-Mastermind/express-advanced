import React, { useEffect, useState } from 'react';
import './App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import SplashContainer from './SplashContainer';
import HomeContainer from './HomeContainer';
import RegisterContainer from './RegisterContainer';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/home">
          <HomeContainer />
        </Route>
        <Route path="/register">
          <RegisterContainer />
        </Route>
        <Route path="/">
          <SplashContainer />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
