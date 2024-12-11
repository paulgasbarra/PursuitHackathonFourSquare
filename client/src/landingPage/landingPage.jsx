import React, { useState } from "react";
import Modal from "../Modal/Modal";
import "./landingPage.css";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [singlePlayer, setSinglePlayer] = useState(false);
  const [coOp, setCoOp] = useState(false);
  const [onlineMatch, setOnlineMatch] = useState(false);

  const leaderboard = [
    { rank: 1, username: "Player1", wins: 50 },
    { rank: 2, username: "Player2", wins: 45 },
    { rank: 3, username: "Player3", wins: 40 },
    { rank: 4, username: "Player4", wins: 35 },
    { rank: 5, username: "Player5", wins: 30 },
  ];

  return (
    <div className="landing-page">
      {/* Player Profile Section */}
      <div className="landing-page__section player-profile">
        <h2>Player Profile</h2>
        <div className="profile">
          <div className="profile__username">John Doe</div>
        </div>
        <div className="score">
          <p className="score__wins">Wins: 10</p>
          <p className="score__lose">Losses: 5</p>
          <p className="score__ties">Ties: 2</p>
        </div>
      </div>

      {/* Play Mode Section */}
      <div className="landing-page__section play-mode">
        <h1>Connect 4</h1>
        <div className="play-mode__buttons">
          <Link to="/vsbot">
            <button
              className="play-mode__buttons-singlePlayer"
              onClick={() => setSinglePlayer(true)}
            >
              Single Player
            </button>
          </Link>
          <Link to="/game">
            <button
              className="play-mode__buttons-CoOp"
              onClick={() => setCoOp(true)}
            >
              Local 2 Player
            </button>
          </Link>
          <button
            className="play-mode__buttons-onlineMatch"
            onClick={() => setOnlineMatch(true)}
          >
            Online Match
          </button>
        </div>
      </div>

      {/* Leaderboard Section */}
      <div className="landing-page__section leaderboard">
        <h2>Leaderboard</h2>
        <table className="leaderboard__table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Username</th>
              <th>Wins</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((player) => (
              <tr key={player.rank}>
                <td>{player.rank}</td>
                <td>{player.username}</td>
                <td>{player.wins}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
