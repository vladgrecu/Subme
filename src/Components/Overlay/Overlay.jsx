import React from "react";
import "./overlay.css";

const Overlay = ({ percentage, message }) => {
  return (
    <div className="loading style-2">
      <div className="overlayItems">
        <p className="overlayMsg">{message}</p>
        <p className="overlayPercentage">{percentage}%</p>
      </div>
      <div className="loading-wheel"></div>
    </div>
  );
};

export default Overlay;
