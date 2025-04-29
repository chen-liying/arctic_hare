import React from "react";
import "./PredatorPopup.css";
import { ExclamationTriangleIcon } from "./CustomIcons";

const predatorImages = {
  "Polar Bear": "/images/polar-bear.jpg",
  "Arctic Fox": "/images/arctic-fox.jpg",
  "Snow Owl": "/images/snow-owl.jpg",
  "White-tailed Eagle": "/images/eagle.jpg",
};

const PredatorPopup = ({ isVisible, predatorType, onClose }) => {
  if (!isVisible) return null;

  const predatorImage = predatorImages[predatorType] || "";

  return (
    <div className="predator-popup-overlay">
      <div className="predator-popup">
        <div className="predator-popup-header">
          <ExclamationTriangleIcon className="predator-warning-icon" />
          <h3>Danger!</h3>
        </div>
        <div className="predator-image-container">
          <img
            src={predatorImage}
            alt={`${predatorType}`}
            className="predator-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/api/placeholder/300/200";
            }}
          />
        </div>
        <div className="predator-popup-content">
          <p>The hare had to flee from a {predatorType}!</p>
          <p className="predator-popup-fullness">-3 Fullness</p>
        </div>
        <button className="predator-popup-close-btn" onClick={onClose}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default PredatorPopup;
