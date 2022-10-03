import React from 'react'
import axios from 'axios'   
import {useSelector, useDispatch} from 'react-redux';
import TeamStandings from './TeamStandings';
import IndividualStandings from './IndividualStandings';
import BowlingForm from './BowlingForm';
import BowlingScores from './BowlingScores';
import Spinner from '../../Spinner';


function Bowling({event, teams}) {
    const {user, isLoading, isError, isSuccess, message} = useSelector( 
        (state) => state.auth);
    
    if(!event || teams.length<6){
      return <Spinner />
    }
  return (
    <div>
      <br />
      {<TeamStandings scoreData={event.scoreData} teams={teams}/>}
      <br /> 
      <br />
      <div className='scoreStandingContainer'>
        {user && user.admin ? <BowlingForm event={event} teams={teams}/> : <BowlingScores event={event} teams={teams} />}
        {<IndividualStandings scoreData={event.scoreData} teams={teams} />}
      </div>
      <br />
      <br />
      <br />
      
      <br />
      <br />
      <br />
    </div>

  )
}

export default Bowling