import React from 'react';

function Navbar({ loggedInUser, logoutUser }) {
  return loggedInUser 
    ? (
      <nav className="navbar float-right">
        <p className="navbar-brand">
          Logged in as {loggedInUser.email} <button className="btn btn-sm btn-primary ml-2 mb-1" onClick={logoutUser}>Logout</button>
        </p>
      </nav>
    )
    : <nav></nav>
}

export default Navbar;