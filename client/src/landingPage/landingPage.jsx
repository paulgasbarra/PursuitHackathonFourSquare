import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import "./landingPage.css";

const LandingPage = () => {
  const [singlePlayer, setSinglePlayer] = useState(false);
  const [coOp, setCoOp] = useState(false);
  const [onlineMatch, setOnlineMatch] = useState(false);

  return (
    <div>
      <div className='player-profile'>
        <div className='profile'>
          <div className="profile__username"></div>
        </div>
        <div className='score'>
          <p className="score__wins">Wins: </p>
          <p className="score__lose">Losses: </p>
          <p className="score__ties">Ties: </p>
        </div>
      </div>
      <div className="play-mode">
        <h1>Connect 4</h1>
        <div className='play-mode__buttons'>
          <button
            className='play-mode__buttons-singlePlayer'
            onClick={() => setSinglePlayer(true)}
          >
            Single Player
          </button>
          <button
            className='play-mode__buttons-CoOp'
            onClick={() => setCoOp(true)}
          >
            Local Co-Op
          </button>
          <button
            className='play-mode__buttons-onlineMatch'
            onClick={() => setOnlineMatch(true)}
          >
            Online Match
          </button>
        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={singlePlayer}
        onClose={() => setSinglePlayer(false)}
        title="Single Player Mode"
      >
        <p>Prepare to play against the computer!</p>
      </Modal>

      <Modal
        isOpen={coOp}
        onClose={() => setCoOp(false)}
        title="Local Co-Op Mode"
      >
        <p>Take turns playing against a friend on the same device!</p>
      </Modal>

      <Modal
        isOpen={onlineMatch}
        onClose={() => setOnlineMatch(false)}
        title="Online Match"
      >
        <p>Find an online opponent and start playing!</p>
      </Modal>
    </div>
  );
};

export default LandingPage;
