import React from 'react';
import "./modal.css";

const Modal = ({ isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button className="modal__close" onClick={onClose}>×</button>
        <div className="modal__body">
          {/* Dropdown for Board Size */}
          <label htmlFor="board-size-dropdown" className="modal__label">Select Board Size:</label>
          <select id="board-size-dropdown" className="modal__dropdown">
            <option value="boardSize6x7">6x7</option>
            <option value="boardSize8x8">8x8</option>
            <option value="boardSize10x10">10x10</option>
          </select>

          {/* Dropdown for Who Plays First */}
          <label htmlFor="player-turn-dropdown" className="modal__label">Who Plays First:</label>
          <select id="player-turn-dropdown" className="modal__dropdown">
            <option value="player1">Player 1</option>
            <option value="player2">Player 2</option>
            <option value="computer">Computer</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Modal;
