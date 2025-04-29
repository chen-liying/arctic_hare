import React from "react";
import "./PredatorPopup.css";
import { ExclamationTriangleIcon } from "./CustomIcons";

const predatorImages = {
  "Polar Bear": require("./animals/real/real_polar_bear.jpg"),
  "Arctic Fox": require("./animals/real/real_arctic_fox.png"),
  "Snow Owl": require("./animals/real/real_snowey_owl.jpg"),
  "White-tailed Eagle": require("./animals/real/real_white_tailed_eagle.jpg"),
};

const PredatorPopup = ({ isVisible, predatorType, onClose }) => {
  if (!isVisible) return null;

  console.log("predator Type: ", predatorType);
  // Use default empty string if predator type is not found in images object
  const predatorImage =
    predatorType && predatorImages[predatorType]
      ? predatorImages[predatorType]
      : "";

  return (
    <div className="predator-popup-overlay">
      <div className="predator-popup">
        <div className="predator-popup-header">
          <ExclamationTriangleIcon className="predator-warning-icon" />
          <h3>Danger!</h3>
        </div>
        <div className="predator-image-container">
          {predatorImage ? (
            <img
              src={predatorImage}
              alt={`${predatorType}`}
              className="predator-image"
              onError={(e) => {
                console.log("Image failed to load:", predatorImage);
                e.target.onerror = null;
                e.target.src = "/api/placeholder/300/200";
              }}
            />
          ) : (
            <div className="predator-image-placeholder">No image available</div>
          )}
        </div>
        <div className="predator-popup-content">
          <p>The hare had to flee from a {predatorType}!</p>
          <p className="predator-popup-energy">-3 Energy</p>
        </div>
        <button className="predator-popup-close-btn" onClick={onClose}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default PredatorPopup;
