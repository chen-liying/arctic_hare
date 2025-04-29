import React from "react";
import "./AnimalIcons.css";

const PolarBearImage = require("./animals/polar_bear.png");
const ArcticHareImage = require("./animals/arctic_hare.png");
const ArcticHarePinkImage = require("./animals/arctic_hare_pink.png");
const ArcticHareYellowImage = require("./animals/arctic_hare_yellow.png");
const ArcticHarePurpleImage = require("./animals/arctic_hare_purple.png");
const ArcticHareBlueImage = require("./animals/arctic_hare_blue.png");
const ArcticHare2Image = require("./animals/arctic_hare2.png");
const SnowOwlImage = require("./animals/snow_owl.png");
const ArcticFoxImage = require("./animals/arctic_fox.png");
const EagleImage = require("./animals/eagle.png");

export const PolarBearIcon = () => (
  <img
    src={PolarBearImage}
    alt="Polar Bear"
    className="animal-icon"
    onError={(e) => {
      console.error("Failed to load Polar Bear image");
      e.target.src =
        'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="lightgray"/></svg>';
    }}
  />
);

export const ArcticHareIcon = () => (
  <img
    src={ArcticHareImage}
    alt="Arctic Hare"
    className="animal-icon"
    onError={(e) => {
      console.error("Failed to load Arctic Hare image");
      e.target.src =
        'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="lightgray"/></svg>';
    }}
  />
);

export const ArcticHarePinkIcon = () => (
  <img
    src={ArcticHarePinkImage}
    alt="Arctic Hare Pink"
    className="animal-icon"
    onError={(e) => {
      console.error("Failed to load Arctic Hare Pink image");
      e.target.src =
        'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="lightgray"/></svg>';
    }}
  />
);

export const ArcticHareYellowIcon = () => (
  <img
    src={ArcticHareYellowImage}
    alt="Arctic Hare Yellow"
    className="animal-icon"
    onError={(e) => {
      console.error("Failed to load Arctic Hare Yellow image");
      e.target.src =
        'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="lightgray"/></svg>';
    }}
  />
);

export const ArcticHarePurpleIcon = () => (
  <img
    src={ArcticHarePurpleImage}
    alt="Arctic Hare Purple"
    className="animal-icon"
    onError={(e) => {
      console.error("Failed to load Arctic Hare Purple image");
      e.target.src =
        'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="lightgray"/></svg>';
    }}
  />
);

export const ArcticHareBlueIcon = () => (
  <img
    src={ArcticHareBlueImage}
    alt="Arctic Hare Blue"
    className="animal-icon"
    onError={(e) => {
      console.error("Failed to load Arctic Hare Blue image");
      e.target.src =
        'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="lightgray"/></svg>';
    }}
  />
);

export const ArcticHare2Icon = () => (
  <img
    src={ArcticHare2Image}
    alt="Arctic Hare2"
    className="animal-icon"
    onError={(e) => {
      console.error("Failed to load Arctic Hare2 image");
      e.target.src =
        'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="lightgray"/></svg>';
    }}
  />
);

export const SnowOwlIcon = () => (
  <img
    src={SnowOwlImage}
    alt="Snow Owl"
    className="animal-icon"
    onError={(e) => {
      console.error("Failed to load Snow Owl image");
      e.target.src =
        'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="lightgray"/></svg>';
    }}
  />
);

export const ArcticFoxIcon = () => (
  <img
    src={ArcticFoxImage}
    alt="Arctic Fox"
    className="animal-icon"
    onError={(e) => {
      console.error("Failed to load Arctic Fox image");
      e.target.src =
        'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="lightgray"/></svg>';
    }}
  />
);

export const EagleIcon = () => (
  <img
    src={EagleImage}
    alt="White-tailed Eagle"
    className="animal-icon"
    onError={(e) => {
      console.error("Failed to load Eagle image");
      e.target.src =
        'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="lightgray"/></svg>';
    }}
  />
);

export const animalOptions = [
  {
    id: "arctic-hare",
    name: "Arctic Hare",
    icon: <ArcticHareIcon />,
  },
  {
    id: "arctic-hare-pink",
    name: "Arctic Hare Pink",
    icon: <ArcticHarePinkIcon />,
  },
  {
    id: "arctic-hare-yellow",
    name: "Arctic Hare Yellow",
    icon: <ArcticHareYellowIcon />,
  },
  {
    id: "arctic-hare-purple",
    name: "Arctic Hare Purple",
    icon: <ArcticHarePurpleIcon />,
  },
  {
    id: "arctic-hare-blue",
    name: "Arctic Hare Blue",
    icon: <ArcticHareBlueIcon />,
  },
  {
    id: "arctic-hare2",
    name: "Snowshoe Hare",
    icon: <ArcticHare2Icon />,
  },
];

export default animalOptions;
