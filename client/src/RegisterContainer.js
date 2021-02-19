import React, { useState } from 'react';
import logo from './logo.svg';

import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

function RegisterContainer() {
  const [registerEmailText, setRegisterEmailText] = useState('');
  const [registerPasswordText, setregisterPasswordText] = useState('');

  const history = useHistory();

  const registerOnSubmit = (e) => {
    e.preventDefault();

    const body = {
      email: registerEmailText,
      password: registerPasswordText
    }

    axios.post('api/auth/register', body).then(response => {
      history.push({
        pathname: '/',
        search: '?register_successful=true'
      });
    });
  }

  return (
    <div className="App">
      <div className="container container-fluid">
        <header className="App-header mb-4">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Ready to 10x your productivity?</h1>
          <h2>Reigster for an account with an email address and password!</h2>
        </header>
        <div className="row">
          <form className="col-lg-4 offset-lg-4" onSubmit={registerOnSubmit}>
            <div className="input-group mb-3">
              <input 
                className="form-control" 
                value={registerEmailText} 
                onChange={(e) => setRegisterEmailText(e.target.value)} 
                placeholder="Email"/>
            </div>
            <div className="input-group mb-3">
              <input 
                className="form-control" 
                type="password"
                value={registerPasswordText} 
                onChange={(e) => setregisterPasswordText(e.target.value)} 
                placeholder="Password"/>
            </div>
            <button type="submit" className="btn btn-primary btn-lg btn-block">Create Account</button>
            <p className="mt-3">Already have an account? <Link to='/'>Click here</Link> to login.</p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterContainer;