import React from 'react'
import { useState } from 'react';
import axios from 'axios'   
import {Dialog} from "@mui/material";
import {useSelector, useDispatch} from 'react-redux';
import TeamStandings from './TeamStandings';
import IndividualStandings from './IndividualStandings';
import BowlingForm from './BowlingForm';
import BowlingScores from './BowlingScores';
import ScoredEditForm from '../ScoredEditForm';
import Spinner from '../../Spinner';


function Bowling({event, teams, events}) {
    const {user, isLoading, isError, isSuccess, message} = useSelector( 
        (state) => state.auth);

      const [open, setOpen] = useState(false);

      const handleClickToOpen = () => {
        setOpen(true);
      };
  
      const handleToClose = () => {
        setOpen(false);
      };
    
    if(!event || teams.length<6){
      return <Spinner />
    }

    let results = [];

    const editScoredDialog = (
      <Dialog open={open} onClose={handleToClose}>
        <ScoredEditForm event={event} teams={teams} results={results} events={events}/>
      </Dialog>
    );

  return (
    <div>
      <br />
      {editScoredDialog}
      {user && user.admin ? 
        <button className='editEvent' onClick={handleClickToOpen} >edit event</button>
          : <></>}
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