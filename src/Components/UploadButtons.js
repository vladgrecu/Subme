import React from 'react';
import fromDevice from '../Photo/fromDevice.png';
import videoIcon from '../Photo/videoicon.jpg';
import {Link} from 'react-router-dom';
import '../Styles/uploadbuttons.css'

const UploadButtons= () => {
  return (
    <div className="content">
      <h3 className="uploadTitle">Add subtitles to your video in any language</h3>
      <div className="link-container">
        <Link className="button" to="/Upload">
            <img className="upload" alt="upload video button" src={fromDevice}/>
            <p className="buttonText">Upload from Local Source</p>
        </Link>
        <Link className="button" to="/Upload">
            <img className="upload" alt="upload video button" src={videoIcon}/>
            <p className="buttonText">Upload from Online Source</p>
        </Link>
      </div>
    </div>
  )
}

export default UploadButtons;

