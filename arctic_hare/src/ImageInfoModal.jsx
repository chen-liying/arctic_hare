import React from "react";
import "./ImageInfoModal.css";
import { LargeFunFactIcon, LargeKnowledgeIcon } from "./CustomIcons";

const ImageInfoModal = ({ isOpen, onClose, type, content }) => {
  if (!isOpen) return null;

  let icon = null;
  let title = "";
  let borderColor = "";

  if (type === "funFact") {
    icon = <LargeFunFactIcon />;
    title = "Cool Arctic Hare Fact!";
    borderColor = "#ffc107"; // Yellow
  } else if (type === "knowledge") {
    icon = <LargeKnowledgeIcon />;
    title = "Learn About Arctic Hares!";
    borderColor = "#17a2b8"; // Teal
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="info-modal"
        style={{ borderColor }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="header-container">
          <div className="modal-icon">{icon}</div>
          <h2>{title}</h2>
        </div>

        <div className="modal-content-with-image">
          <div className="modal-image-container">
            <img
              src={content.image}
              alt={content.alt}
              className="modal-image"
            />
          </div>
          <div className="modal-text">{content.text}</div>
        </div>

        {/* Fixed button - ensuring it's always visible */}
        <button className="close-btn" onClick={onClose}>
          Continue Play!
        </button>
      </div>
    </div>
  );
};

export default ImageInfoModal;
