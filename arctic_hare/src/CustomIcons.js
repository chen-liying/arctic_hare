import React from "react";

const GoImage = require("./app_images/go.png");
const BerriesImage = require("./app_images/crowberry.png");
const KnowledgeImage = require("./app_images/knowledge.png");
const FunFactImage = require("./app_images/fun_fact.png");
const MossImage = require("./app_images/moss.png");
const ArcticWillowImage = require("./app_images/arctic_willow.png");

export const GoIcon = () => (
  <img
    src={GoImage}
    alt="Go"
    style={{
      width: "36px", // Small enough to fit in the space
      height: "auto", // Maintain aspect ratio
      maxHeight: "36px",
      verticalAlign: "middle", // Better alignment with other icons
    }}
  />
);

export const BerriesIcon = () => (
  <img
    src={BerriesImage}
    alt="Berries"
    style={{
      width: "24px", // Small enough to fit in the space
      height: "auto", // Maintain aspect ratio
      maxHeight: "24px",
      verticalAlign: "middle", // Better alignment with other icons
    }}
  />
);

export const ArcticWillowIcon = () => (
  <img
    src={ArcticWillowImage}
    alt="Arctic Willow"
    style={{
      width: "32px", // Small enough to fit in the space
      height: "auto", // Maintain aspect ratio
      maxHeight: "32px",
      verticalAlign: "middle", // Better alignment with other icons
    }}
  />
);

// Default sized KnowledgeIcon for regular UI elements
export const KnowledgeIcon = ({ className, style }) => (
  <img
    src={KnowledgeImage}
    alt="Knowledge"
    className={className}
    style={{
      width: "24px", // Small enough to fit in the space
      height: "auto", // Maintain aspect ratio
      maxHeight: "24px",
      verticalAlign: "middle", // Better alignment with other icons
      ...style,
    }}
  />
);

// Default sized FunFactIcon for regular UI elements
export const FunFactIcon = ({ className, style }) => (
  <img
    src={FunFactImage}
    alt="Fun Fact"
    className={className}
    style={{
      width: "24px", // Small enough to fit in the space
      height: "auto", // Maintain aspect ratio
      maxHeight: "24px",
      verticalAlign: "middle", // Better alignment with other icons
      ...style,
    }}
  />
);

// Larger KnowledgeIcon for modal usage
export const LargeKnowledgeIcon = () => (
  <img
    src={KnowledgeImage}
    alt="Knowledge"
    style={{
      width: "60px", // Larger size for modal
      height: "auto",
      maxHeight: "60px",
      filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2))",
    }}
  />
);

// Larger FunFactIcon for modal usage
export const LargeFunFactIcon = () => (
  <img
    src={FunFactImage}
    alt="Fun Fact"
    style={{
      width: "60px", // Larger size for modal
      height: "auto",
      maxHeight: "60px",
      filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2))",
    }}
  />
);

export const MossIcon = () => (
  <img
    src={MossImage}
    alt="Moss"
    style={{
      width: "24px", // Small enough to fit in the space
      height: "auto", // Maintain aspect ratio
      maxHeight: "24px",
      verticalAlign: "middle", // Better alignment with other icons
    }}
  />
);

export const ExclamationTriangleIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 1.5C6.201 1.5 1.5 6.201 1.5 12S6.201 22.5 12 22.5 22.5 17.799 22.5 12 17.799 1.5 12 1.5zM12 20.5C7.313 20.5 3.5 16.687 3.5 12S7.313 3.5 12 3.5 20.5 7.313 20.5 12 16.687 20.5 12 20.5z" />
      <path d="M12 7a1 1 0 00-1 1v4a1 1 0 002 0V8a1 1 0 00-1-1zm0 9.5a1 1 0 100-2 1 1 0 000 2z" />
    </svg>
  );
};

export const SmileIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
    <line x1="9" y1="9" x2="9.01" y2="9"></line>
    <line x1="15" y1="9" x2="15.01" y2="9"></line>
  </svg>
);
