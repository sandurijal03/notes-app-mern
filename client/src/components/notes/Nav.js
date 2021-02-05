import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ setIsLogin }) => {
  const logoutSubmit = () => {
    localStorage.clear();
    setIsLogin(false);
  };

  return (
    <header>
      <div className='logo'>
        <h1>
          <Link to='/'>Sandy Notes</Link>
        </h1>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/create'>Create</Link>
          </li>
          <li onClick={logoutSubmit}>
            <Link to='/'>logout</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Nav;
