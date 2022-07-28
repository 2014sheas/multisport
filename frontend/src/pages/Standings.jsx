import {useEffect} from 'react';
import CompleteStandings from '../components/CompleteStandings';
import getEvents from '../features/events/eventSlice';
import getTeams from '../features/teams/teamSlice';
import {useSelector, useDispatch} from 'react-redux'


function Standings() {
    

  return (
      <>
        <div>Standings</div>
        <CompleteStandings />
      </>
    
  )
}

export default Standings