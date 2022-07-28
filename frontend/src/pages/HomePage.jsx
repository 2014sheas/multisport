import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Spinner from '../components/Spinner'
import { getEvents, reset } from '../features/events/eventSlice';
import { getTeams, updateTeam } from '../features/teams/teamSlice'
import EventTicker from '../components/EventTicker'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import CompleteStandings from '../components/CompleteStandings';

const API_URL = '/api/teams/';

function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { teams } = useSelector((state) => state.teams);
  const { events } = useSelector((state) => state.events);


  

  function completeEvent() {

    // initialize a 6x5 array to store the finishing places for each event
    let resultstsArr = [
      [
        [],[],[],[],[]
      ],[
        [],[],[],[],[]
      ],[
        [],[],[],[],[]
      ],[
        [],[],[],[],[]
      ],[
        [],[],[],[],[]
      ]
      ,[
        [],[],[],[],[]
      ]
    ]
    let pointsArr = [0,0,0,0,0,0];
    
    events.forEach(event => {
      if(event.status === 'Complete'){
        let i=0;
        event.results.forEach(result => {
          let fullPoints = event.fullPoints;
          resultstsArr[result-1][i++].push(event.name);
          switch(i-1){
            case 0:
              pointsArr[result-1] += fullPoints ? 9 : 5;
              break;
            case 1:
              pointsArr[result-1] += fullPoints ? 6 : 3;
              break;
            case 2:
              pointsArr[result-1] += fullPoints ? 4 : 2;
              break;
            case 3:
              pointsArr[result-1] += fullPoints ? 2 : 1;
              break;
            default:
              break;
            
          }
        })
      }
    });
    

    const newTeams = teams.map(team => {
      let tID = team.teamID;
      return{...team, 
        first: resultstsArr[tID-1][0],
        second: resultstsArr[tID-1][1],
        third: resultstsArr[tID-1][2],
        fourth: resultstsArr[tID-1][3],
        currentPoints: pointsArr[tID-1],
      }
    });

    teams.forEach(team => {
      let tID = team.teamID;
      let curTeam = { 
        first: resultstsArr[tID-1][0],
        second: resultstsArr[tID-1][1],
        third: resultstsArr[tID-1][2],
        fourth: resultstsArr[tID-1][3],
        currentPoints: pointsArr[tID-1],
      }
      console.log(curTeam.currentPoints);
      axios.put(API_URL + team._id, curTeam)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        })
    

    })
    dispatch(getTeams());
  }


  const eventTickers = events.map((event) => {
    return <EventTicker key={event.eventID} event={event}/>
  })

  const teamArr = teams.map((team) => {
    return <p key={team.teamID}>{team.name} : {team.currentPoints}</p>
  })

  


  return (
    <>
      <h3>HomePage</h3>
      <button onClick={completeEvent}>Update</button>
      <section className="content">
        <div className="goals">
          {eventTickers}
          {teamArr}
        </div>
      </section>

    </>
  )
}

export default HomePage