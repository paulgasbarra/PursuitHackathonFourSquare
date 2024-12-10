import React, { useState } from 'react'
import "./landingPage.css"

const landingPage = () => {
  const { API } = useContext(UserContext);
  const [singlePlayer, setSinglePlayer] = useState(false)
  const [coOp, setCoOp] = useState(false)
  const [onlineMatch, setOnlineMatch] = useState(false)
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
      <div className='play-mode'>
        <h1>Connect 4</h1>
        <div className='play-mode__buttons'>
          <button>Single Player</button>
          <button>Local Co-Op</button>
          <button>Online Match</button>
        </div>
      
      </div>
    </div>
  )
}

export default landingPage