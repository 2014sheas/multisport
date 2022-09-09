import React from 'react'
import Spinner from '../Spinner';

function HomepageGameTicker({game, teams}) {



    if(!game || teams.length < 6){
        return <></>
      }

      const homeName = game.home ? teams[game.home -1].abbreviation : 'TBD';
      const awayName = game.away ? teams[game.away -1].abbreviation : 'TBD';


      let progressColor, homeColor, awayColor, hasStarted;


      switch(game.status){
        case 'In Progress':
          hasStarted = true;
          progressColor = 'Gold';
          break;
        case 'Complete':
          game.winner === game.home ? homeColor = 'Green' : awayColor = 'Green';
          hasStarted = true;
          progressColor = 'Green';
          break;
        default:
          hasStarted = false;
          progressColor = 'Orange';
      }
    
      if(teams.length < 6 ){
        return <Spinner />
      }



  return (
    <div>
      <div className='gameTicker'>
        <div className="gameEvent" >{game.event}</div>
        <h4 style={{color:homeColor}}>{homeName}{hasStarted ? <span>: {game.homeScore}</span>  : <></>}</h4>
        <h4 style={{color:awayColor}}>{awayName}{hasStarted ? <span>: {game.awayScore}</span>  : <></>}</h4>
        <div className="progress" style={{color:progressColor}}>{game.status}</div>
      </div>
    </div>
  )
}

export default HomepageGameTicker