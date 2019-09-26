import React from 'react';
import './Styles/navbarstyle.css'
import {Link} from 'react-router-dom';

const Navbar= () => {
  return (
    <div className="navbar">
      <div className="header-items">
        <div className="logo">Sub.me [...]</div>
        <ul className="menu">
          <Link style={{ textDecoration: 'none', color: 'white' }} to="/">
            <li className="menu-item">Home</li>
          </Link>
          <Link style={{ textDecoration: 'none', color: 'white' }} to="/FAQ">
            <li className="menu-item">FAQ</li>
          </Link>
        </ul>
      </div>
    </div>
  )
}

export default Navbar