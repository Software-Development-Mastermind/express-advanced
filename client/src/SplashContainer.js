import React, { useState } from 'react';
import logo from './logo.svg';

import axios from 'axios';
const queryString = require('query-string');
import { Link, useHistory, useLocation } from 'react-router-dom';

function SplashContainer(props) {
  const [loginEmailText, setLoginEmailText] = useState('');
  const [passwordEmailText, setPasswordEmailText] = useState('');

  const history = useHistory();
  const location = useLocation();

  const loginOnSubmit = (e) => {
    e.preventDefault();

    const body = {
      email: loginEmailText,
      password: passwordEmailText
    }

    // login
    axios.post('api/auth/login', body).then(response => {
      localStorage.setItem('todo-app-user-id', response.data.userId);
      history.push('home');
    });
  }

  const successfulRegisterText = location.search && queryString.parse(location.search).register_successful === 'true'
    ? <div className="alert alert-success">You've successfully created an account! Login below to get started!</div>
    : null;

  return (
    <div className="App">
      <div className="container container-fluid">
        <header className="App-header mb-4">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Welcome to the best todo app in existence!</h1>
          <h2>Login or register to begin</h2>
        </header>
        <div className="row">
          <form className="col-lg-4 offset-lg-4" onSubmit={loginOnSubmit}>
            {successfulRegisterText}
            <div className="input-group mb-3">
              <input 
                className="form-control" 
                value={loginEmailText} 
                onChange={(e) => setLoginEmailText(e.target.value)} 
                placeholder="Email"/>
            </div>
            <div className="input-group mb-3">
              <input 
                className="form-control" 
                type="password"
                value={passwordEmailText} 
                onChange={(e) => setPasswordEmailText(e.target.value)} 
                placeholder="Password"/>
            </div>
            <button type="submit" className="btn btn-primary btn-lg btn-block">Login</button>
            <p className="mt-3">Don't have an account? <Link to='register'>Click here</Link> to register.</p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SplashContainer;