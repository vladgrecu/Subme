import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faKey, faClosedCaptioning, faCog } from '@fortawesome/free-solid-svg-icons';
import './Styles/howtouse.css'

const HowToUse= () => {
  return (
    <div className="info-container">
      <h3 className="infoTitle">Follow these steps</h3>
          <ul className="stepByStep">
            <li className="step">
              <FontAwesomeIcon icon={faUpload} className="bounceUp" size="4x" style={{ color: 'rgb(59, 150, 68)' }} />
              <p className="stepInfo">
                Enter the link of the video that you want to add subtitles to or choose a file from your device or cloud storage.</p>
            </li>
            <li className="step">
              <FontAwesomeIcon icon={faKey} className="swingKey" size="4x" style={{ color: 'rgb(245, 164, 42)' }} />
              <p className="stepInfo">Get your API Key. Click here to get a full walkthrough with the steps you need to take in order to get your key.</p>
            </li>
            <li className="step">
              <FontAwesomeIcon icon={faCog} className="spinOnHover" size="4x" style={{ color: 'rgb(219, 94, 48)' }}/>
              <p className="stepInfo">Click "Start" to start the conversion process and wait for the magic to happen.</p>
            </li>
            <li className="step">
              <FontAwesomeIcon icon={faClosedCaptioning} className="tada" size="4x" style={{ color: 'rgb(70, 136, 242)' }}/>
              <p className="stepInfo">That's it! You can download the file once the conversion has been completed!</p>
            </li>
          </ul>
    </div>
  )
}

export default HowToUse;