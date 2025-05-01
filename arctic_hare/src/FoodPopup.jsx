import React, { useState } from "react";
import "./FoodPopup.css";
import { SmileIcon } from "./CustomIcons";

const foodImages = {
  berry: require("./app_images/food/arctic_hare_berry.jpg"),
  moss: require("./app_images/food/arctic_hare_moss.jpg"),
  arctic_willow: require("./app_images/food/hare_with_arctic_willow.jpg"),
};

const foodDescriptions = {
  berry:
    "<strong>Berries</strong> are a vital food source for Arctic hares. Rich in nutrients and natural sugars, they provide essential energy during summer.",
  moss: "<strong>Moss</strong> is a staple food for Arctic hares, available even in winter. It can be found under the snow when other food is scarce.",
  arctic_willow:
    "<strong>Arctic willow</strong> provides tender shoots and bark that Arctic hares rely on year-round. This hardy plant survives harsh conditions.",
};

const foodTitles = {
  berry: "Found Berries!",
  moss: "Found Moss!",
  arctic_willow: "Found Arctic Willow!",
  food: "Found Food!",
};

const FoodPopup = ({ isVisible, foodType, onClose }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!isVisible) return null;

  const foodImage =
    foodType && foodImages[foodType] ? foodImages[foodType] : "";

  const description =
    foodDescriptions[foodType] || "A nutritious food source for the hare.";

  const title = foodTitles[foodType] || "Found Food!";

  const handleImageLoad = (e) => {
    setImageLoaded(true);
  };

  return (
    <div className="food-popup-overlay" onClick={onClose}>
      <div className="food-popup" onClick={(e) => e.stopPropagation()}>
        <div className="food-popup-header">
          <SmileIcon className="food-icon" />
          <h3>{title}</h3>
        </div>

        <div className="food-image-container">
          {foodImage ? (
            <img
              src={foodImage}
              alt={`${foodType} food`}
              className="food-image"
              onLoad={handleImageLoad}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/api/placeholder/450/300";
                setImageLoaded(true);
              }}
              style={{
                opacity: imageLoaded ? 1 : 0,
                transition: "opacity 0.3s ease-in-out",
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
