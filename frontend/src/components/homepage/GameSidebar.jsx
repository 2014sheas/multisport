import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import HomepageGameTicker from './HomepageGameTicker';

function GameSidebar() {
    const { teams } = useSelector((state) => state.teams);
    const { games } = useSelector((state) => state.games);
    let recentGames = [];
    let gameTickers = [];

    if(games.length > 0 && teams.length == 6){
        recentGames = games.slice(0,5);

        gameTickers = recentGames.map((game) => {
            return <HomepageGameTicker teams={teams} game={game} />
        })
    }
  return (
    <div>
        <h4>
            Recent Games
        </h4>
        {gameTickers}
    </div>
  )
}

export default GameSidebar
