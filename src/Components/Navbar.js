import React from 'react';
import '../Styles/navbarstyle.css'
import {Link} from 'react-router-dom';

const Navbar= () => {
  
  return (
    <div className="navbar">
      <div className="navbar-items">
        <Link className="logo" to="/">Sub.me [...]</Link>
        <div className="menu">
          <Link className="menu-item" to="/">Home</Link>
          <Link className="menu-item" to="/FAQ">FAQ</Link>
        </div>
      </div>
    </div>
  )
}
export default Navbar