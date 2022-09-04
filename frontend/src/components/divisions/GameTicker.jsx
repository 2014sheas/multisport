import {useState} from 'react'
import Spinner from '../Spinner';
import { useSelector, useDispatch } from 'react-redux';
import GameEditForm from './GameEditForm';

import {Dialog} from "@mui/material";

function GameTicker({game, teams, playoffGames}) {
  
  
  const {user, isLoading, isError, isSuccess, message} = useSelector( 
    (state) => state.auth);

  const [open, setOpen] = useState(false);

  if(!game || teams.length < 6){
    return <></>
  }
  
  const handleClickToOpen = () => {
    setOpen(true);
  };
  
  const handleToClose = () => {
    setOpen(false);
  };

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

  

  const editGameDialog = (
    <Dialog open={open} onClose={handleToClose}>
      <GameEditForm game={game} teams={teams} playoffGames={playoffGames} />
    </Dialog>
  );


  return (
    <div>
      {editGameDialog}
      <div className='gameTicker'>
          {(user && user.admin)? <button onClick={handleClickToOpen}>edit</button> : <></>}
          <h4 style={{color:homeColor}}>{homeName}{hasStarted ? <span>: {game.homeScore}</span>  : <></>}</h4>
          <h4 style={{color:awayColor}}>{awayName}{hasStarted ? <span>: {game.awayScore}</span>  : <></>}</h4>
          <div className="progress" style={{color:progressColor}}>{game.status}</div>
      </div>
    </div>
  )
}

export default GameTicker