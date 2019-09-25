import React from 'react';
import './Styles/navbarstyle.css'

const Navbar= () => {
  return (
    <div className="navbar">
      <div className="header-items">
        <div className="logo">Sub.me [...]</div>
        <ul className="menu">
          <li className="menu-item">Home</li>
          <li className="menu-item">FAQ</li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar