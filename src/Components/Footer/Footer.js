import React from "react";
// import {Link} from 'react-router-dom';
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="site-map">
        <p>Create SRT</p>
        <p>Copyright Notice</p>
        <p>Terms of Use</p>
        <p>Privacy Policy</p>
        <p>Contact</p>
      </div>
      <div className="copyright">
        Copyright © 2019 - Sub.me - All rights reserved
      </div>
    </div>
  );
};
export default Footer;
