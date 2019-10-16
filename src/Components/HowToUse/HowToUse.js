import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUpload,
  faClosedCaptioning,
  faCog,
  faLanguage
} from "@fortawesome/free-solid-svg-icons";
import "./howtouse.css";

const HowToUse = () => {
  return (
    <div className="info-container">
      <h3 className="infoTitle">Follow these steps</h3>
      <ul className="stepByStep">
        <li className="step">
          <FontAwesomeIcon
            icon={faUpload}
            className="bounceUp"
            size="4x"
            style={{ color: "rgb(59, 150, 68)" }}
          />
          <p className="stepInfo">
            Select any audio/video file that you want to have subtitles for.
          </p>
        </li>
        <li className="step">
          <FontAwesomeIcon
            icon={faLanguage}
            className="swingKey"
            size="4x"
            style={{ color: "rgb(245, 164, 42)" }}
          />
          <p className="stepInfo">
            Select the language beeing used in your audio/video file.Afterwards,
            select the language you want your captions to be in.
          </p>
        </li>
        <li className="step">
          <FontAwesomeIcon
            icon={faCog}
            className="spinOnHover"
            size="4x"
            style={{ color: "rgb(219, 94, 48)" }}
          />
          <p className="stepInfo">
            Click "Get Your Subtitles" to start the conversion process and wait
            for the magic to happen.
          </p>
        </li>
        <li className="step">
          <FontAwesomeIcon
            icon={faClosedCaptioning}
            className="tada"
            size="4x"
            style={{ color: "rgb(70, 136, 242)" }}
          />
          <p className="stepInfo">
            That's it! Your file will be downloaded once the conversion has been
            completed!
          </p>
        </li>
      </ul>
    </div>
  );
};

export default HowToUse;
