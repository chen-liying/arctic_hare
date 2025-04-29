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

export const KnowledgeIcon = () => (
  <img
    src={KnowledgeImage}
    alt="Knowledge"
    style={{
      width: "24px", // Small enough to fit in the space
      height: "auto", // Maintain aspect ratio
      maxHeight: "24px",
      verticalAlign: "middle", // Better alignment with other icons
    }}
  />
);

export const FunFactIcon = () => (
  <img
    src={FunFactImage}
    alt="Fun Fact"
    style={{
      width: "24px", // Small enough to fit in the space
      height: "auto", // Maintain aspect ratio
      maxHeight: "24px",
      verticalAlign: "middle", // Better alignment with other icons
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
