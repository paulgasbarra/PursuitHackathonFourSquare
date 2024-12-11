import React, { useState, useEffect } from "react";
import "./grid.css"; // Import CSS file for grid styles
import { Link, useNavigate } from "react-router-dom";

const BotPlayer = () => {
  // BOT ------------BOT ------------BOT ------------BOT ------------BOT ------------
  function calculateScore(grid, color) {
    let score = 0;

    // Opponent's color
    const opponentColor = color === "Red" ? "Blue" : "Red";

    // Helper function to count sequences
    function countSequence(startRow, startCol, rowStep, colStep, targetColor) {
      let count = 0;
      let openEnds = 0;

      for (let i = 0; i < 4; i++) {
        // Check up to 4 in a line
        const row = startRow + i * rowStep;
        const col = startCol + i * colStep;

        if (row >= 0 && row < grid.length && col >= 0 && col < grid[0].length) {
          if (grid[row][col].color === targetColor) {
            count++;
          } else if (grid[row][col].color === "white") {
            openEnds++;
          } else {
            break;
          }
        } else {
          break;
        }
      }

      return { count, openEnds };
    }

    // Evaluate all directions: rows, columns, and diagonals
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        if (
          grid[row][col].color === "white" ||
          grid[row][col].color === color
        ) {
          // Horizontal (right)
          let { count, openEnds } = countSequence(row, col, 0, 1, color);
          score += evaluatePattern(count, openEnds);

          // Vertical (down)
          ({ count, openEnds } = countSequence(row, col, 1, 0, color));
          score += evaluatePattern(count, openEnds);

          // Diagonal (down-right)
          ({ count, openEnds } = countSequence(row, col, 1, 1, color));
          score += evaluatePattern(count, openEnds);

          // Diagonal (down-left)
          ({ count, openEnds } = countSequence(row, col, 1, -1, color));
          score += evaluatePattern(count, openEnds);

          // Repeat for the opponent to reduce their potential
          ({ count, openEnds } = countSequence(row, col, 0, 1, opponentColor));
          score -= evaluatePattern(count, openEnds);

          ({ count, openEnds } = countSequence(row, col, 1, 0, opponentColor));
          score -= evaluatePattern(count, openEnds);

          ({ count, openEnds } = countSequence(row, col, 1, 1, opponentColor));
          score -= evaluatePattern(count, openEnds);

          ({ count, openEnds } = countSequence(row, col, 1, -1, opponentColor));
          score -= evaluatePattern(count, openEnds);
        }
      }
    }

    return score;
  }

  // Function to evaluate the pattern score
  function evaluatePattern(count, openEnds) {
    if (count === 4) {
      return 1000; // Winning move
    } else if (count === 3 && openEnds > 0) {
      return 50; // Good potential for winning
    } else if (count === 2 && openEnds > 1) {
      return 10; // Early game advantage
    }
    return 0; // Neutral or blocked
  }

  // Function to calculate the minimax value of a board state
  function minimax(grid, depth, isMaximizing, color) {
    if (checkForWin(grid)) {
      return isMaximizing ? -10 : 10; // Score for win/loss
    }

    if (depth === 0 || isGridFull(grid)) {
      return calculateScore(grid, color); // Return heuristic score instead of 0
    }

    let bestScore = isMaximizing ? -Infinity : Infinity;

    for (let col = 0; col < grid[0].length; col++) {
      const result = simulateMove(grid, col, color);
      if (result) {
        const newGrid = result.grid;
        const score = minimax(
          newGrid,
          depth - 1,
          !isMaximizing,
          isMaximizing ? "Blue" : "Red"
        );

        bestScore = isMaximizing
          ? Math.max(score, bestScore)
          : Math.min(score, bestScore);
      }
    }

    return bestScore;
  }

  // Simulate the move and return new grid state
  function simulateMove(grid, col, color) {
    const newGrid = grid.map((row) => row.map((square) => ({ ...square })));
    for (let row = newGrid.length - 1; row >= 0; row--) {
      if (newGrid[row][col].color === "white") {
        newGrid[row][col].color = color;
        return { grid: newGrid, row, col };
      }
    }
    return null; // Column is full
  }

  // Check if the grid is full
  function isGridFull(grid) {
    return grid.every((row) => row.every((square) => square.color !== "white"));
  }

  // AI move function
  function makeAIMove(grid) {
    let bestScore = -Infinity;
    let bestMove = null;

    for (let col = 0; col < grid[0].length; col++) {
      // Check for immediate win
      const winResult = simulateMove(grid, col, "Red");
      if (winResult && checkForWin(winResult.grid)) {
        return col; // Take winning move
      }

      // Check for immediate block
      const blockResult = simulateMove(grid, col, "Blue");
      if (blockResult && checkForWin(blockResult.grid)) {
        return col; // Block opponent's winning move
      }

      // Use minimax to evaluate other moves
      const result = simulateMove(grid, col, "Red");
      if (result) {
        const score = minimax(result.grid, 4, false, "Blue");
        if (score > bestScore) {
          bestScore = score;
          bestMove = col;
        }
      }
    }

    return bestMove !== null ? bestMove : 0; // Default to column 0 if no valid moves
  }

  // GRID ------------GRID ------------GRID ------------GRID ------------GRID ------------
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

  useEffect(() => {
    if (currentColor === "Red") {
      const bestMove = makeAIMove(gridData);
      if (bestMove !== null) {
        const column = String.fromCharCode("a".charCodeAt(0) + bestMove); // Convert to column letter
        handleSquareClick(column); // Pass the column as a string
      }
    }
  }, [currentColor, gridData]);

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

export default BotPlayer;
