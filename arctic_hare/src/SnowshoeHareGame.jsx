import React, { useState } from "react";
import "./SnowshoeHareGame.css";
import animalOptions, {
  ArcticFoxIcon,
  EagleIcon,
  PolarBearIcon,
  SnowOwlIcon,
} from "./AnimalIcons";
import {
  ArcticWillowIcon,
  BerriesIcon,
  FunFactIcon,
  GoIcon,
  KnowledgeIcon,
  MossIcon,
} from "./CustomIcons";

import { ArcticHareData } from "./ArcticHareData";
import ImageInfoModal from "./ImageInfoModal";
import PredatorPopup from "./PredatorPopup";
import FoodPopup from "./FoodPopup";

const SnowshoeHareGame = () => {
  // Game state
  const [players, setPlayers] = useState([
    {
      id: 1,
      position: 0,
      energy: 20,
      knowledge: 0,
      funFacts: 0,
      character: animalOptions[0].id,
      icon: animalOptions[0].icon,
      name: "Player 1",
    },
    {
      id: 2,
      position: 0,
      energy: 20,
      knowledge: 0,
      funFacts: 0,
      character: animalOptions[1].id,
      icon: animalOptions[1].icon,
      name: "Player 2",
    },
  ]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [message, setMessage] = useState(
    "Select your characters and start the game!"
  );
  const [movingPlayer, setMovingPlayer] = useState(null);
  const [diceValue, setDiceValue] = useState(6); // Initialize with 6 to show dice at start
  const [diceRolling, setDiceRolling] = useState(false);
  const [diceFaces, setDiceFaces] = useState([]);
  const [showStatusCards, setShowStatusCards] = useState(true);
  const [turnStarted, setTurnStarted] = useState(false);
  // State for game over modal
  const [gameOver, setGameOver] = useState(false);
  const [gameOverPlayer, setGameOverPlayer] = useState(null);
  const [buttonsEnabled, setButtonsEnabled] = useState(true);

  // State for info modal
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalContent, setModalContent] = useState({});

  // Enhanced predator popup state
  const [showPredatorPopup, setShowPredatorPopup] = useState(false);
  const [predatorType, setPredatorType] = useState("");

  // Food popup state
  const [showFoodPopup, setShowFoodPopup] = useState(false);
  const [foodType, setFoodType] = useState("");

  // Constants
  const TOTAL_POSITIONS = 20;
  const MAX_ENERGY = 20; // Maximum energy a hare can reach
  const MIN_ENERGY = 0; // Minimum energy a hare can reach

  // Board positions generation - creates a path of 20 positions around the board
  const generateBoardPositions = () => {
    const positions = [];

    // Top row (left to right): 0-5
    for (let i = 0; i < 6; i++) {
      positions.push({ row: 0, col: i });
    }

    // Right column (top to bottom, excluding top-right corner): 6-10
    for (let i = 1; i < 6; i++) {
      positions.push({ row: i, col: 5 });
    }

    // Bottom row (right to left, excluding bottom-right corner): 11-15
    for (let i = 4; i >= 0; i--) {
      positions.push({ row: 5, col: i });
    }

    // Left column (bottom to top, excluding bottom-left corner): 16-19
    for (let i = 4; i >= 1; i--) {
      positions.push({ row: i, col: 0 });
    }

    return positions;
  };

  const boardPositions = generateBoardPositions();

  // Special spaces
  const specialSpaces = {
    0: { type: "go", icon: <GoIcon /> },
    2: { type: "predator", icon: <PolarBearIcon /> },
    3: { type: "food", icon: <BerriesIcon /> },
    4: { type: "knowledge", icon: <KnowledgeIcon /> },
    5: { type: "predator", icon: <ArcticFoxIcon /> },
    6: { type: "funFact", icon: <FunFactIcon /> },
    7: { type: "food", icon: <MossIcon /> },
    9: { type: "food", icon: <BerriesIcon /> },
    10: { type: "knowledge", icon: <KnowledgeIcon /> },
    11: { type: "food", icon: <ArcticWillowIcon /> },
    13: { type: "predator", icon: <SnowOwlIcon /> },
    14: { type: "funFact", icon: <FunFactIcon /> },
    15: { type: "food", icon: <BerriesIcon /> },
    16: { type: "predator", icon: <EagleIcon /> },
    17: { type: "food", icon: <MossIcon /> },
    18: { type: "knowledge", icon: <KnowledgeIcon /> },
    19: { type: "funFact", icon: <FunFactIcon /> },
  };

  // Get predator name based on icon type
  const getPredatorName = (iconComponent) => {
    if (iconComponent.type === PolarBearIcon) return "Polar Bear";
    if (iconComponent.type === ArcticFoxIcon) return "Arctic Fox";
    if (iconComponent.type === SnowOwlIcon) return "Snow Owl";
    if (iconComponent.type === EagleIcon) return "White-tailed Eagle";
    return "Predator";
  };

  // Function to show InfoModal
  const handleSpecialSpace = (spaceType, spaceIcon) => {
    if (spaceType === "funFact" || spaceType === "knowledge") {
      // Get content array based on the space type
      const contentArray =
        spaceType === "funFact"
          ? ArcticHareData.funFacts
          : ArcticHareData.knowledge;

      // Select a random item from the array
      const randomIndex = Math.floor(Math.random() * contentArray.length);
      const content = contentArray[randomIndex];

      // Set modal properties and show it
      setModalType(spaceType);
      setModalContent(content);
      setShowInfoModal(true);
    } else if (spaceType === "predator") {
      // Show enhanced predator popup
      setPredatorType(getPredatorName(spaceIcon));
      setShowPredatorPopup(true);
    } else if (spaceType === "food") {
      // Determine food type and show food popup
      let foodType = "food";
      if (spaceIcon.type === BerriesIcon) {
        foodType = "berry";
      } else if (spaceIcon.type === MossIcon) {
        foodType = "moss";
      } else if (spaceIcon.type === ArcticWillowIcon) {
        foodType = "arctic_willow";
      }

      setFoodType(foodType);
      setShowFoodPopup(true);
    }
  };

  // Helper function to get animal name from ID
  const getAnimalNameById = (id) => {
    const animal = animalOptions.find((option) => option.id === id);
    return animal ? animal.name : "Unknown Animal";
  };

  // Handle character selection
  const selectCharacter = (playerId, animalOption) => {
    if (gameStarted) return;

    setPlayers(
      players.map((player) =>
        player.id === playerId
          ? {
              ...player,
              character: animalOption.id,
              icon: animalOption.icon,
            }
          : player
      )
    );
  };

  // Start the game
  const startGame = () => {
    // Validate character selection
    const uniqueCharacters = new Set(players.map((p) => p.character));
    if (uniqueCharacters.size !== players.length) {
      setMessage("Each player must select a different character!");
      return;
    }

    setGameStarted(true);
    const firstPlayerAnimal = getAnimalNameById(players[0].character);
    setMessage(`${firstPlayerAnimal} Player 1's turn! Roll the dice to start.`);
  };

  // Roll dice with animation
  const rollDice = () => {
    if (!gameStarted || movingPlayer || diceRolling || gameOver) return;

    // Set turnStarted to true when a player rolls the dice
    setTurnStarted(true);

    // Decrease energy is now handled after the move in proceedWithMove

    setDiceRolling(true);

    // Generate a sequence of random dice faces for animation
    const rollAnimationSequence = [];
    const animationDuration = 2000; // 2 seconds
    const fps = 15; // Higher frames per second for smoother animation
    const totalFrames = Math.floor(animationDuration / (1000 / fps));

    // Generate random dice faces for the animation
    for (let i = 0; i < totalFrames; i++) {
      rollAnimationSequence.push(Math.floor(Math.random() * 6) + 1);
    }

    // Make sure we don't repeat the same number too many times in a row
    for (let i = 1; i < rollAnimationSequence.length; i++) {
      if (rollAnimationSequence[i] === rollAnimationSequence[i - 1]) {
        rollAnimationSequence[i] = (rollAnimationSequence[i] % 6) + 1;
      }
    }

    // Final dice value - determined at the start but only revealed at the end
    const finalDiceRoll = Math.floor(Math.random() * 6) + 1;

    // Add a slight pause at the end by repeating the final value
    rollAnimationSequence.push(finalDiceRoll);
    rollAnimationSequence.push(finalDiceRoll);
    rollAnimationSequence.push(finalDiceRoll);

    setDiceFaces(rollAnimationSequence);

    // Start the animation
    let frameIndex = 0;
    const animateRoll = () => {
      if (frameIndex < rollAnimationSequence.length) {
        setDiceValue(rollAnimationSequence[frameIndex]);
        frameIndex++;

        // Gradually slow down animation toward the end
        const slowdownFactor = Math.min(
          1.5,
          1 + frameIndex / rollAnimationSequence.length
        );
        setTimeout(animateRoll, (1000 / fps) * slowdownFactor);
      } else {
        // Animation complete, proceed with the move
        setDiceRolling(false);
        proceedWithMove(finalDiceRoll);
      }
    };

    animateRoll();
  };

  // Proceed with the move after dice animation finishes
  const proceedWithMove = (diceRoll) => {
    const currentPlayer = players[currentPlayerIndex];
    const currentPlayerAnimal = getAnimalNameById(currentPlayer.character);

    // Calculate new position
    const newPosition = (currentPlayer.position + diceRoll) % TOTAL_POSITIONS;

    setMessage(`${currentPlayerAnimal} rolled a ${diceRoll}!`);

    // Generate array of positions to move through
    const moveSteps = [];
    for (let i = 1; i <= diceRoll; i++) {
      moveSteps.push((currentPlayer.position + i) % TOTAL_POSITIONS);
    }

    // Set initial player data
    setMovingPlayer({
      playerId: currentPlayer.id,
      oldPosition: currentPlayer.position,
      newPosition: newPosition,
      steps: diceRoll,
      currentStep: -1, // Start at -1 so first increment goes to 0
      moveSteps: moveSteps,
      animationComplete: false,
    });

    // Move through each step with sequential timeouts
    const movePlayerStepByStep = (stepIndex) => {
      // If we've gone through all steps
      if (stepIndex >= moveSteps.length) {
        // Mark movement as animation still showing final position
        setMovingPlayer((prev) => ({
          ...prev,
          currentStep: moveSteps.length, // Set as complete
          animationComplete: true,
        }));

        // Update player's position in state and check for special spaces
        let updatedEnergy = -1; // Default: deduct 1 energy for non-food spaces
        let updatedKnowledge = 0;
        let updatedFunFacts = 0;
        let spaceMessage = "";

        // Check for special spaces
        const specialSpace = specialSpaces[newPosition];
        if (specialSpace) {
          if (specialSpace.type === "food") {
            updatedEnergy = 1; // Gain 1 food point when landing on food space

            // Determine what type of food was found
            let foodType = "food";
            if (specialSpace.icon.type === BerriesIcon) {
              foodType = "berry";
            } else if (specialSpace.icon.type === MossIcon) {
              foodType = "moss";
            } else if (specialSpace.icon.type === ArcticWillowIcon) {
              foodType = "arctic willow";
            }

            spaceMessage = `${currentPlayerAnimal} landed on a ${foodType} space and is now more full!`;

            // Show food popup
            handleSpecialSpace("food", specialSpace.icon);
          } else if (specialSpace.type === "knowledge") {
            updatedKnowledge = 1; // Gain 1 knowledge point
            spaceMessage = `${currentPlayerAnimal} landed on a knowledge space and learned something new! Lost 1 energy point.`;

            // Show knowledge modal
            handleSpecialSpace("knowledge");
          } else if (specialSpace.type === "funFact") {
            updatedFunFacts = 1; // Gain 1 fun fact point
            spaceMessage = `${currentPlayerAnimal} landed on a fun fact space and discovered something interesting! Lost 1 energy point.`;

            // Show fun fact modal
            handleSpecialSpace("funFact");
          } else if (specialSpace.type === "go") {
            updatedEnergy = 3;
            spaceMessage = `${currentPlayerAnimal} landed on the GO space! Got 3 energy point recover.`;
          } else if (specialSpace.type === "predator") {
            updatedEnergy = -3; // Lose 3 energy points when encountering a predator (extra loss due to fleeing)
            const predatorName = getPredatorName(specialSpace.icon);
            spaceMessage = `${currentPlayerAnimal} encountered a ${predatorName} and had to flee! Lost 3 energy points.`;

            // Show predator popup
            handleSpecialSpace("predator", specialSpace.icon);
          }
        } else {
          spaceMessage = `${currentPlayerAnimal} moved to space ${
            newPosition + 1
          }. Lost 1 energy point.`;
        }

        setMessage(spaceMessage);

        // Calculate new energy value and check if it hits 0
        const newEnergy = Math.min(
          MAX_ENERGY,
          Math.max(MIN_ENERGY, currentPlayer.energy + updatedEnergy)
        );

        const updatedPlayers = players.map((player) =>
          player.id === currentPlayer.id
            ? {
                ...player,
                position: newPosition,
                energy: newEnergy,
                knowledge: player.knowledge + updatedKnowledge,
                funFacts: player.funFacts + updatedFunFacts,
              }
            : player
        );

        setPlayers(updatedPlayers);

        // Check if player's energy reached 0 - Game Over
        if (newEnergy === 0) {
          setGameOverPlayer(currentPlayer);
          setGameOver(true);

          // Disable buttons initially
          setButtonsEnabled(false);

          // Enable buttons after delay (e.g., 5 seconds)
          setTimeout(() => {
            setButtonsEnabled(true);
          }, 5000); // 5000ms = 5 seconds

          return;
        }

        // If there's no predator, food, or other popup, proceed to next player
        if (
          !specialSpace ||
          (specialSpace.type !== "predator" &&
            specialSpace.type !== "funFact" &&
            specialSpace.type !== "knowledge" &&
            specialSpace.type !== "food")
        ) {
          proceedToNextPlayer(updatedPlayers);
        }
        // Otherwise, for predator/food encounters, wait for popup to be closed
        // The next player turn will be triggered from the popup's onClose handler

        return;
      }

      // Update the current step for animation
      setMovingPlayer((prev) => ({
        ...prev,
        currentStep: stepIndex,
        animationComplete: false,
      }));

      // Schedule the next step with a consistent interval
      setTimeout(() => movePlayerStepByStep(stepIndex + 1), 500);
    };

    // Start the step-by-step movement immediately
    movePlayerStepByStep(0);
  };

  // Helper function to proceed to next player
  const proceedToNextPlayer = (updatedPlayersList) => {
    setTimeout(() => {
      const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;

      // Switch to the next player
      setCurrentPlayerIndex(nextPlayerIndex);
      // Reset turnStarted flag for the new player
      setTurnStarted(false);

      // Get the next player animal name
      const nextPlayerAnimal = getAnimalNameById(
        updatedPlayersList[nextPlayerIndex].character
      );

      // Add message about the next player's turn
      let turnMessage = `${nextPlayerAnimal} Player ${
        nextPlayerIndex + 1
      }'s turn! Roll the dice.`;

      // Check if player is already hungry
      if (updatedPlayersList[nextPlayerIndex].energy <= 5) {
        turnMessage = `${nextPlayerAnimal} is hungry! ${turnMessage}`;
      }

      setMessage(turnMessage);

      // Reset moving player
      setMovingPlayer(null);
    }, 800);
  };

  // Handle the completion of the predator popup
  const handlePredatorPopupClose = () => {
    setShowPredatorPopup(false);
    proceedToNextPlayer(players);
  };

  // Handle the completion of the food popup
  const handleFoodPopupClose = () => {
    setShowFoodPopup(false);
    proceedToNextPlayer(players);
  };

  // Restart game when player chooses to play again
  const restartGame = () => {
    // Reset all game state
    setPlayers([
      {
        id: 1,
        position: 0,
        energy: 20,
        knowledge: 0,
        funFacts: 0,
        character: animalOptions[0].id,
        icon: animalOptions[0].icon,
        name: "Player 1",
      },
      {
        id: 2,
        position: 0,
        energy: 20,
        knowledge: 0,
        funFacts: 0,
        character: animalOptions[1].id,
        icon: animalOptions[1].icon,
        name: "Player 2",
      },
    ]);
    setCurrentPlayerIndex(0);
    setGameStarted(false);
    setMessage("Select your characters and start the game!");
    setMovingPlayer(null);
    setDiceValue(6); // Keep showing the dice at start
    setDiceRolling(false);
    setDiceFaces([]);
    setTurnStarted(false);
    setGameOver(false);
    setGameOverPlayer(null);
    setShowInfoModal(false);
    setShowPredatorPopup(false);
    setShowFoodPopup(false);
    setButtonsEnabled(true);
  };

  // Exit game function (in a real app, this might redirect to another page)
  const exitGame = () => {
    // For this implementation, we'll just restart but you could add different behavior
    restartGame();
    setMessage("Thanks for playing! Start a new game by selecting characters.");
  };

  // Get the display number for a position (1-20)
  const getPositionDisplay = (position) => {
    return position + 1;
  };

  // Get the coordinates for a position
  const getPositionCoordinates = (position) => {
    const posIndex = position % TOTAL_POSITIONS;
    return boardPositions[posIndex];
  };

  // Convert row/col to board index
  const getBoardIndex = (row, col) => {
    return row * 6 + col;
  };

  // Calculate energy percentage for the progress bar
  const getEnergyPercentage = (energy) => {
    return (energy / MAX_ENERGY) * 100;
  };

  // Get energy status text based on energy level
  const getEnergyStatus = (energy) => {
    if (energy === 0) return "Starving";
    if (energy < 5) return "Very Hungry";
    if (energy < 10) return "Hungry";
    if (energy < 15) return "Satisfied";
    return "";
  };

  // Determine color class for energy bar based on level
  const getEnergyColorClass = (energy) => {
    if (energy < 5) return "energy-low";
    if (energy < 10) return "energy-medium";
    if (energy < 15) return "energy-good";
    return "energy-excellent";
  };

  // Render dice face based on value
  const renderDiceFace = (value) => {
    const dotPositions = {
      1: [{ top: "50%", left: "50%" }],
      2: [
        { top: "25%", left: "25%" },
        { top: "75%", left: "75%" },
      ],
      3: [
        { top: "25%", left: "25%" },
        { top: "50%", left: "50%" },
        { top: "75%", left: "75%" },
      ],
      4: [
        { top: "25%", left: "25%" },
        { top: "25%", left: "75%" },
        { top: "75%", left: "25%" },
        { top: "75%", left: "75%" },
      ],
      5: [
        { top: "25%", left: "25%" },
        { top: "25%", left: "75%" },
        { top: "50%", left: "50%" },
        { top: "75%", left: "25%" },
        { top: "75%", left: "75%" },
      ],
      6: [
        { top: "25%", left: "25%" },
        { top: "25%", left: "75%" },
        { top: "50%", left: "25%" },
        { top: "50%", left: "75%" },
        { top: "75%", left: "25%" },
        { top: "75%", left: "75%" },
      ],
    };

    return (
      <div className={`dice-face ${diceRolling ? "rolling" : ""}`}>
        {dotPositions[value].map((pos, index) => (
          <div
            key={index}
            className="dice-dot"
            style={{ top: pos.top, left: pos.left }}
          />
        ))}
      </div>
    );
  };

  // Render character icon or emoji
  const renderCharacter = (player) => {
    return player.icon;
  };

  return (
    <div className="game-container">
      <h1>Knowledge Fest - Arctic Hares</h1>

      {/* Player Status Cards */}
      {gameStarted && showStatusCards && (
        <div className="player-status-container">
          {players.map((player) => (
            <div
              key={player.id}
              className={`player-status-card ${
                currentPlayerIndex ===
                players.findIndex((p) => p.id === player.id)
                  ? "active-player"
                  : ""
              }`}
            >
              <div className="player-card-header">
                <span className="player-character">
                  {renderCharacter(player)}
                </span>
                <span className="player-name">{player.name}</span>
              </div>

              {/* Energy bar */}
              <div className="energy-container">
                <div className="energy-label">
                  <span>Energy: {getEnergyStatus(player.energy)}</span>
                  <span className="energy-value">
                    {player.energy}/{MAX_ENERGY}
                  </span>
                </div>
                <div className="energy-bar-container">
                  <div
                    className={`energy-bar ${getEnergyColorClass(
                      player.energy
                    )}`}
                    style={{
                      width: `${getEnergyPercentage(player.energy)}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="player-stats">
                <div className="player-stat">
                  <span className="stat-icon">
                    <KnowledgeIcon />
                  </span>
                  <span className="stat-value">{player.knowledge}</span>
                </div>
                <div className="player-stat">
                  <span className="stat-icon">
                    <FunFactIcon />
                  </span>
                  <span className="stat-value">{player.funFacts}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Message Area */}
      <div className="message-box">{message}</div>

      {/* Character Selection */}
      {!gameStarted && (
        <div className="character-selection">
          <h2>Choose Your Characters</h2>
          {players.map((player) => (
            <div key={player.id} className="player-selection">
              <span>Player {player.id}:</span>
              <div className="character-options">
                {animalOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => selectCharacter(player.id, option)}
                    className={`character-btn ${
                      player.character === option.id ? "selected" : ""
                    } ${
                      players.some(
                        (p) => p.character === option.id && p.id !== player.id
                      )
                        ? "disabled"
                        : ""
                    }`}
                    disabled={players.some(
                      (p) => p.character === option.id && p.id !== player.id
                    )}
                  >
                    <div className="character-icon-container">
                      {option.icon}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button onClick={startGame} className="start-game-btn">
            Start Game
          </button>
        </div>
      )}

      {/* Game Board */}
      {gameStarted && (
        <div className="game-board">
          {Array.from({ length: 36 }).map((_, index) => {
            const row = Math.floor(index / 6);
            const col = index % 6;

            // Check if this cell is on the outer path
            const pathPosition = boardPositions.findIndex(
              (pos) => pos.row === row && pos.col === col
            );
            const isOnPath = pathPosition !== -1;

            // Determine players on this space
            const playersHere = players.filter((player) => {
              // If a player is currently in the moving animation, use their visual position instead
              if (movingPlayer && movingPlayer.playerId === player.id) {
                // Before movement begins or after it completes and animation is fully done
                if (
                  (movingPlayer.currentStep === undefined ||
                    movingPlayer.currentStep >=
                      movingPlayer.moveSteps?.length) &&
                  movingPlayer.animationComplete
                ) {
                  const playerCoords = getPositionCoordinates(player.position);
                  return playerCoords.row === row && playerCoords.col === col;
                }
                return false; // Don't show player at their board position during movement
              }

              // For non-moving players, show at their current position
              const playerCoords = getPositionCoordinates(player.position);
              return playerCoords.row === row && playerCoords.col === col;
            });

            // Check for special spaces
            const special = isOnPath ? specialSpaces[pathPosition] : null;

            // Center region for the dice (2x2 in the middle)
            const isCenterRegion = row >= 2 && row <= 3 && col >= 2 && col <= 3;

            // Determine background color based on space type
            const getSpaceBackgroundColor = () => {
              if (!special) return ""; // Default color from CSS

              switch (special.type) {
                case "food":
                  return "rgb(212, 237, 218)"; // Light green for food (converted from #d4edda)
                case "knowledge":
                case "funFact":
                  return "#fff3cd"; // Same color for knowledge and fun facts
                case "go":
                  return "rgb(211, 211, 211)"; // Light yellow for GO
                default:
                  return ""; // Default color from CSS
              }
            };

            return (
              <div
                key={index}
                style={{ backgroundColor: getSpaceBackgroundColor() }}
                className={`board-space ${isOnPath ? "path-space" : ""} ${
                  isCenterRegion ? "center-space" : ""
                } ${special ? `special-${special.type}` : ""}`}
              >
                {isOnPath && (
                  <>
                    {/* Space number - showing 1-20 */}
                    <span className="space-number">
                      {getPositionDisplay(pathPosition)}
                    </span>

                    {/* Special space icon */}
                    {special && (
                      <span className="special-icon">
                        {typeof special.icon === "string"
                          ? special.icon
                          : special.icon}
                      </span>
                    )}

                    {/* Player tokens */}
                    <div className="player-tokens">
                      {playersHere.map((player) => {
                        // Only show tokens of players that aren't currently moving
                        const isMoving =
                          movingPlayer && movingPlayer.playerId === player.id;
                        if (isMoving) return null;

                        return (
                          <span
                            key={player.id}
                            className={`player-token ${
                              currentPlayerIndex ===
                              players.findIndex((p) => p.id === player.id)
                                ? "current-player-token"
                                : ""
                            }`}
                          >
                            {renderCharacter(player)}
                          </span>
                        );
                      })}
                    </div>
                  </>
                )}

                {/* Dice in center - only show when in center region */}
                {isCenterRegion && row === 2 && col === 2 && (
                  <div className="dice-container">
                    {diceValue ? renderDiceFace(diceValue) : renderDiceFace(1)}
                  </div>
                )}
              </div>
            );
          })}

          {/* Moving player animation */}
          {movingPlayer && movingPlayer.moveSteps && (
            <div
              className="moving-token-container"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                zIndex: 100,
              }}
            >
              {movingPlayer.currentStep >= 0 &&
              movingPlayer.currentStep < movingPlayer.moveSteps.length ? (
                // Show animation token during movement - FIXED version
                <div
                  className="player-token moving-token"
                  style={{
                    position: "absolute",
                    fontSize: "1.5rem",
                    // Base position calculation - adjusted for first step
                    top: `calc(${
                      (getPositionCoordinates(
                        movingPlayer.currentStep === 0
                          ? movingPlayer.oldPosition
                          : movingPlayer.moveSteps[movingPlayer.currentStep - 1]
                      ).row *
                        100) /
                        6 +
                      8.33
                    }%)`,
                    left: `calc(${
                      (getPositionCoordinates(
                        movingPlayer.currentStep === 0
                          ? movingPlayer.oldPosition
                          : movingPlayer.moveSteps[movingPlayer.currentStep - 1]
                      ).col *
                        100) /
                        6 +
                      8.33
                    }%)`,
                    // Translation calculation - now consistent for all steps
                    transform: `translate(-50%, -50%) translate(
              ${
                ((getPositionCoordinates(
                  movingPlayer.currentStep === 0
                    ? movingPlayer.moveSteps[0]
                    : movingPlayer.moveSteps[movingPlayer.currentStep]
                ).col -
                  getPositionCoordinates(
                    movingPlayer.currentStep === 0
                      ? movingPlayer.oldPosition
                      : movingPlayer.moveSteps[movingPlayer.currentStep - 1]
                  ).col) *
                  100) /
                6
              }%, 
              ${
                ((getPositionCoordinates(
                  movingPlayer.currentStep === 0
                    ? movingPlayer.moveSteps[0]
                    : movingPlayer.moveSteps[movingPlayer.currentStep]
                ).row -
                  getPositionCoordinates(
                    movingPlayer.currentStep === 0
                      ? movingPlayer.oldPosition
                      : movingPlayer.moveSteps[movingPlayer.currentStep - 1]
                  ).row) *
                  100) /
                6
              }%
            )`,
                    transition: "transform 0.5s ease-out",
                    animation: "hop 0.5s ease-out",
                    zIndex: 200,
                  }}
                >
                  {renderCharacter(
                    players.find((p) => p.id === movingPlayer.playerId)
                  )}
                </div>
              ) : (
                // Show token at final position after movement completes
                <div
                  className="player-token"
                  style={{
                    position: "absolute",
                    fontSize: "1.5rem",
                    // Position at center of the final space
                    top: `calc(${
                      (getPositionCoordinates(movingPlayer.newPosition).row *
                        100) /
                        6 +
                      8.33
                    }%)`,
                    left: `calc(${
                      (getPositionCoordinates(movingPlayer.newPosition).col *
                        100) /
                        6 +
                      8.33
                    }%)`,
                    transform: "translate(-50%, -50%)",
                    zIndex: 200,
                  }}
                >
                  {renderCharacter(
                    players.find((p) => p.id === movingPlayer.playerId)
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Dice Roll Button */}
      {gameStarted && !gameOver && (
        <button
          onClick={rollDice}
          className="roll-dice-btn"
          disabled={!!movingPlayer || diceRolling}
        >
          {diceRolling ? "Rolling..." : "Roll Dice"}
        </button>
      )}

      {/* Game Over Modal */}
      {gameOver && (
        <div className="modal-overlay">
          <div className="game-over-modal">
            <div className="modal-icon">
              {gameOverPlayer && renderCharacter(gameOverPlayer)}
            </div>
            <h2>Game Over!</h2>
            <p>
              {gameOverPlayer && getAnimalNameById(gameOverPlayer.character)}{" "}
              has run out of energy and is too hungry to continue.
            </p>
            <div className="modal-stats">
              <div className="modal-stat">
                <KnowledgeIcon />
                <span>
                  Knowledge: {gameOverPlayer ? gameOverPlayer.knowledge : 0}
                </span>
              </div>
              <div className="modal-stat">
                <FunFactIcon />
                <span>
                  Fun Facts: {gameOverPlayer ? gameOverPlayer.funFacts : 0}
                </span>
              </div>
            </div>
            <div className="modal-buttons">
              <button
                onClick={restartGame}
                className={`restart-btn ${
                  !buttonsEnabled ? "button-disabled" : ""
                }`}
                disabled={!buttonsEnabled}
              >
                {buttonsEnabled ? "Play Again" : "Please wait..."}
              </button>
              <button
                onClick={exitGame}
                className={`exit-btn ${
                  !buttonsEnabled ? "button-disabled" : ""
                }`}
                disabled={!buttonsEnabled}
              >
                {buttonsEnabled ? "Exit Game" : ""}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Predator Popup */}
      <PredatorPopup
        isVisible={showPredatorPopup}
        predatorType={predatorType}
        onClose={handlePredatorPopupClose}
      />

      {/* Food Popup */}
      <FoodPopup
        isVisible={showFoodPopup}
        foodType={foodType}
        onClose={handleFoodPopupClose}
      />

      {/* Info Modal for Fun Facts and Knowledge */}
      <ImageInfoModal
        isOpen={showInfoModal}
        onClose={() => {
          setShowInfoModal(false);
          // Proceed to next player after closing the modal
          if (!gameOver) {
            proceedToNextPlayer(players);
          }
        }}
        type={modalType}
        content={modalContent}
      />
    </div>
  );
};

export default SnowshoeHareGame;
