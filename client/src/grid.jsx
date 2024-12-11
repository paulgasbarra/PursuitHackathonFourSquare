import React, { useState, useEffect } from "react";
import "./grid.css"; // Import CSS file for grid styles
import { Link, useNavigate } from "react-router-dom";

const Grid = () => {
  const [grid_id, setGridId] = useState(0);
  const [gridWidth, setGridWidth] = useState(30);
  const [gridData, setGridData] = useState(createEmptyGrid());
  const [currentColor, setCurrentColor] = useState("Blue");
  const [clearGrid, setClearGrid] = useState(false);
  const grid_size = gridWidth * gridWidth;
  const navigate = useNavigate();

  // Function to create an empty grid
  function createEmptyGrid() {
    const grid = [];
    const letters =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`~!@#$%^&*()-_=+;:,<.>/?[]";

    for (let i = 0; i < 6; i++) {
      const row = [];
      for (let j = 0; j < 7; j++) {
        const x = letters.charAt(j);
        const y = i + 1;
        const coordinates = x + y;
        row.push({ coordinates, color: "white", grid_id });
      }
      grid.push(row);
    }

    return grid;
  }

  useEffect(() => {
    const newGrid = createEmptyGrid();
    setGridData(newGrid);
  }, [gridWidth, clearGrid, grid_id]);

  const checkForWin = (grid, row, col, color) => {
    // Directions to check: [rowDelta, colDelta]
    const directions = [
      [0, 1], // Horizontal (right)
      [1, 0], // Vertical (down)
      [1, 1], // Diagonal (down-right)
      [1, -1], // Diagonal (down-left)
    ];

    const numRows = grid.length;
    const numCols = grid[0].length;

    const countConsecutive = (row, col, rowDelta, colDelta) => {
      let count = 0;

      while (
        row >= 0 &&
        row < numRows &&
        col >= 0 &&
        col < numCols &&
        grid[row][col].color === color
      ) {
        count++;
        row += rowDelta;
        col += colDelta;
      }

      return count;
    };

    for (const [rowDelta, colDelta] of directions) {
      // Count squares in both forward and backward directions
      const forwardCount = countConsecutive(row, col, rowDelta, colDelta);
      const backwardCount = countConsecutive(row, col, -rowDelta, -colDelta);

      // Subtract 1 to avoid double-counting the current square
      if (forwardCount + backwardCount - 1 >= 4) {
        return true; // Win condition met
      }
    }

    return false; // No win found
  };

  // Function to handle click on a grid square
  const handleSquareClick = (coordinates) => {
    if (currentColor === "Blue") {
      setCurrentColor("Red");
    } else if (currentColor === "Red") {
      setCurrentColor("Blue");
    }
    setGridData((prevGridData) => {
      const column = coordinates[0];
      const newGrid = [...prevGridData];

      // Find the lowest empty square in this column
      for (let rowIndex = newGrid.length - 1; rowIndex >= 0; rowIndex--) {
        const square = newGrid[rowIndex].find(
          (sq) => sq.coordinates[0] === column && sq.color === "white"
        );

        if (square) {
          square.color = currentColor;

          // Check for win after the move
          const win = checkForWin(
            newGrid,
            rowIndex,
            column.charCodeAt(0) - "a".charCodeAt(0),
            currentColor
          );
          if (win) {
            alert(`${currentColor} wins!`);
          }

          return newGrid;
        }
      }

      return prevGridData;
    });
  };

  const clear = () => {
    setClearGrid(!clearGrid);
  };

  let repeatTimes = 6;

  const root = document.documentElement;
  root.style.setProperty("--repeat-times", repeatTimes); // Update the CSS variable

  return (
    <div>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Home
      </button>
      <h1>Connect 4!</h1>
      <h1>It's {currentColor}'s turn!</h1>
      <div className="grid-container" style={{ gridTemplateColumns: "10fr" }}>
        {gridData.map((row, rowIndex) => (
          <div key={rowIndex} className="grid-row">
            {row.map((square) => (
              <div
                key={`${square.coordinates}`}
                className="grid-square"
                style={{ backgroundColor: square.color }}
                onClick={() => handleSquareClick(square.coordinates)}
              />
            ))}
          </div>
        ))}
      </div>

      <button onClick={clear}>Clear Grid</button>
    </div>
  );
};

export default Grid;
