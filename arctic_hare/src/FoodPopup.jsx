import React from "react";
import "./FoodPopup.css";
import { SmileIcon } from "./CustomIcons";

// Food image imports
const foodImages = {
  berry: require("./app_images/food/arctic_hare_berry.jpg"),
  moss: require("./app_images/food/arctic_hare_moss.jpg"),
  arctic_willow: require("./app_images/food/hare_with_arctic_willow.jpg"),
};

// Food descriptions
const foodDescriptions = {
  berry:
    "<strong>Berries</strong> are a vital food source for Arctic hares. Rich in nutrients and natural sugars, they provide essential energy during the short summer months.",
  moss: "<strong>Moss</strong> is a staple food for Arctic hares, available even in winter. It's high in fiber and can be found under the snow when other food is scarce.",
  arctic_willow:
    "<strong>Arctic willow</strong> provides tender shoots and bark that Arctic hares rely on throughout the year. This plant can survive harsh winter conditions.",
};

const FoodPopup = ({ isVisible, foodType, onClose }) => {
  if (!isVisible) return null;

  // Use default empty string if food type is not found in images object
  const foodImage =
    foodType && foodImages[foodType] ? foodImages[foodType] : "";

  // Get description for the food type
  const description =
    foodDescriptions[foodType] || "A nutritious food source for the hare.";

  return (
    <div className="food-popup-overlay">
      <div className="food-popup">
        <div className="food-popup-header">
          <SmileIcon className="food-icon" />
          <h3>Found Food!</h3>
        </div>
        <div className="food-image-container">
          {foodImage ? (
            <img
              src={foodImage}
              alt={`${foodType} food`}
              className="food-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/api/placeholder/300/200";
              }}
            />
          ) : (
            <div className="food-image-placeholder">No image available</div>
          )}
        </div>
        <div className="food-popup-content">
          <p
            className="food-description"
            dangerouslySetInnerHTML={{ __html: description }}
          ></p>
          <p>The hare has taken a short break to eat.</p>
          <p className="food-popup-energy">+1 Energy</p>
        </div>
        <button className="food-popup-close-btn" onClick={onClose}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default FoodPopup;
