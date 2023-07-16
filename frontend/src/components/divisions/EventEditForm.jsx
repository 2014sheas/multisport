import {useState} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DivisionForm from './DivisionForm';
import {useSelector, useDispatch} from 'react-redux'

import { getEvents, } from '../../features/events/eventSlice'


function EventEditForm({event, playoffs, losers, teams, events, results}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let playoff1 = playoffs[0];
    let playoff2 = playoffs[1];
    let loser1 = losers[0];
    let loser2 = losers[1]

    const [formData, setFormData] = useState({
        homeTeam1: playoff1.home == 0 ? results[0][0].team: playoff1.home,
        homeTeam2: playoff2.home == 0 ? results[1][0].team: playoff2.home,
        homeTeam3: playoff1.home == 0 ? results[0][2].team: loser1.home,
        homeTeam4: playoff2.home == 0 ? results[1][2].team: loser2.home,
        awayTeam1: playoff1.away == 0 ? results[0][1].team: playoff1.away,
        awayTeam2: playoff2.away == 0 ? results[1][1].team: playoff2.away,
        awayTeam3: playoff1.away == 0 ? results[0][3].team: loser1.away,
        awayTeam4: playoff2.away == 0 ? results[1][3].team: loser2.away,

        status: event.status,
        first: event.results.length > 0 ? event.results[0] : 1,
        second: event.results.length > 0 ? event.results[1] : 1,
        third: event.results.length > 0 ? event.results[2] : 1,
        fourth: event.results.length > 0 ? event.results[3] : 1,
        fifth: event.results.length > 0 ? event.results[4] : 1,
        sixth: event.results.length > 0 ? event.results[5] : 1,
        seventh: event.results.length > 0 ? event.results[6] : 1,
        eighth: event.results.length > 0 ? event.results[7] : 1,

    });


    const [active, setActive] = useState(false);
    const [readyforComplete, setReadyForComplete] = useState(false);
    const [readyForPlayoffs, setReadyForPlayoffs] = useState(false);

    const {homeTeam1, homeTeam2, homeTeam3, homeTeam4, awayTeam1, awayTeam2, awayTeam3, awayTeam4,
            status, first, second, third, fourth, fifth, sixth, seventh, eighth} = formData;

    

    const toggleCompleteEvent = (e) => {
        e.preventDefault();

        setReadyForComplete((prevState) => (!prevState))
      }

    const toggleEditPlayoffs = (e) => {
      e.preventDefault();

      setReadyForPlayoffs((prevState) => (!prevState))
  }
    
    const calculatePoints = (allEvents) =>  {

        // initialize a 8x8 array to store the finishing places for each event (8 teams x 8 possible point values)
        let resultstsArr = [
          [
            [],[],[],[],[],[],[],[]
          ],[
            [],[],[],[],[],[],[],[]
          ],[
            [],[],[],[],[],[],[],[]
          ],[
            [],[],[],[],[],[],[],[]
          ],[
            [],[],[],[],[],[],[],[]
          ],[
            [],[],[],[],[],[],[],[]
          ],[
            [],[],[],[],[],[],[],[]
          ],[
            [],[],[],[],[],[],[],[]
          ]
        ]
        let pointsArr = [0,0,0,0,0,0,0,0];
        
        allEvents.forEach(singleEvent => {
          if(singleEvent.status === 'Complete'){

            let isCombined = singleEvent.name === 'Softball' || singleEvent.name === 'Volleyball';
            let isHockey = singleEvent.name === 'Hokcey';
            let isSplit = singleEvent.name === 'Pooping';
            let i=0;
            singleEvent.results.forEach(result => {
              let fullPoints = singleEvent.fullPoints;
              resultstsArr[result-1][i++].push(singleEvent.name);
              switch(i){
                case 1:
                  pointsArr[result-1] += fullPoints ? (isCombined ? 10 : (isHockey ? 6 : 10)) : 5;
                  break;
                case 2:
                  pointsArr[result-1] += fullPoints ? (isCombined ? 10 : 8) : 4;
                  break;
                case 3:
                  pointsArr[result-1] += fullPoints ? (isCombined ? 7 : 6) : 3;
                  break;
                case 4:
                  pointsArr[result-1] += fullPoints ? (isCombined ? 7 : 5) : 2;
                  break;
                case 5:
                  pointsArr[result-1] += fullPoints ? (isCombined ? 5 : (isHockey ? 7 : 3)) : 1;
                  break;
                case 6:
                  pointsArr[result-1] += fullPoints ? (isCombined ? 5 : 3) : 1;
                  break;
                case 7:
                  pointsArr[result-1] += fullPoints ? (isCombined ? 2 : 1) : 0;
                  break;
                case 8:
                  pointsArr[result-1] += fullPoints ? (isCombined ? 2 : 1) : 0;
                  break;
                default:
                  break;
                
              }
            })
          }
        });
    
        teams.forEach(team => {
          let tID = team.teamID;
          let curTeam = { 
            first: resultstsArr[tID-1][0],
            second: resultstsArr[tID-1][1],
            third: resultstsArr[tID-1][2],
            fourth: resultstsArr[tID-1][3],
            fifth: resultstsArr[tID-1][4],
            sixth: resultstsArr[tID-1][5],
            seventh: resultstsArr[tID-1][6],
            eighth: resultstsArr[tID-1][7],
            currentPoints: pointsArr[tID-1],
          }
    
          axios.put('/api/teams/' + team._id, curTeam)
            .then(response => {
              console.log(response);
            })
            .catch(error => {
              console.log(error);
            })
        
    
        })
      }
    
    const toggleEditDivisions = (e) => {
        e.preventDefault();

        setActive((prevState) => (!prevState))
    }

    

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();

        let readyForSubmit  = false;

        if(readyForPlayoffs){
          readyForSubmit  = (homeTeam1 != awayTeam1) && (homeTeam2 != awayTeam2);
          if(readyForSubmit){
              playoff1 = {
                  ...playoff1,
                  home: homeTeam1,
                  away: awayTeam2,
              }

              playoff2 = {
                  ...playoff2,
                  home: homeTeam2,
                  away: awayTeam1,
              }

              loser1 = {

              }

              axios.put('/api/games/' + playoff1._id, playoff1)
                  .then(response => {
                      console.log(response);
                  })
                  .catch(error => {
                      console.log(error);
                  })
              axios.put('/api/games/' + playoff2._id, playoff2)
                  .then(response => {
                      console.log(response);
                  })
                  .catch(error => {
                      console.log(error);
                  })
                  
          }
          else {
              console.log('Invalid Submission');
              console.log('Please make sure all teams are unique');
              
          }
        }
        else if (readyforComplete){
            let eventResults = [parseInt(first), parseInt(second), parseInt(third), parseInt(fourth), parseInt(fifth), parseInt(sixth), parseInt(seventh), parseInt(eighth)];

            let resultsSet  = [...new Set(eventResults)];

            let readyforCompleteSubmit = resultsSet.length === 8;

            if(readyforCompleteSubmit){

                let newEvent = {
                    ...event,
                    results:eventResults,
                    status:'Complete'
                }

                axios.put('/api/events/' + event._id, newEvent)
                    .then(response => {
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(error);
                    })
                dispatch(getEvents())
                calculatePoints(events);
            }
            else {
                console.log('Invalid Submission');
                console.log('Please make sure all teams are unique');
            }
            
        }

      else{
        const eventData = {
          ...event,
          status,
          }
        axios.put('/api/events/' + event._id, eventData)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
      }
        

        navigate(0);
    }

    


    const onCancel = () => {
        setFormData((prevState) => ({
            ...prevState,
        }))
        setActive((false));
    }

    const createDropdowns = (resultList) => {
        
        return resultList.map(result => <option key ={result.team}value={result.team}>{teams[result.team-1].name}</option>);
    }

    const createCompleteDropdowns = () => {
        const teamsList = [1,2,3,4,5,6,7,8];
        

        return teamsList.map(team => <option key ={team}value={team}>{teams[team-1].name}</option>);
    }

    const handleStatusChange = (e) => {
        let currentStatus = e.target.value;
        setFormData((prevState) => ({
            ...prevState,
            status: currentStatus,
        }))
    }

    const selectPlayoffs = (
        <div>
        <h4>Playoff Qualifiers: </h4>
            <label htmlFor='homeTeam1'>Winner Division 1: </label>
                <select id='homeTeam1' name='homeTeam1' value={homeTeam1} onChange={onChange}>
                {createDropdowns(results[0])}
                </select>
                <br></br>
            <label htmlFor='awayTeam1'>2nd Place Division 1: </label>
                <select id='awayTeam1' name='awayTeam1' value={awayTeam1} onChange={onChange}>
                    {createDropdowns(results[0])}
                </select>
            <label htmlFor='hometeam3'>3rd Place Division 1: </label>
                <select id='homeTeam3' name='homeTeam3' value={homeTeam3} onChange={onChange}>
                {createDropdowns(results[0])}
                </select>
            <label htmlFor='awayteam3'>4th Place Division 1: </label>
                <select id='awayTeam3' name='awayTeam3' value={awayTeam3} onChange={onChange}>
                {createDropdowns(results[0])}
                </select>
                <br></br>
            <label htmlFor='homeTeam2'>Winner Division 2: </label>
                <select id='homeTeam2' name='homeTeam2' value={homeTeam2} onChange={onChange}>
                {createDropdowns(results[1])}
                </select>
                <br></br>
            <label htmlFor='awayTeam2'>2nd Place Division 2: </label>
                <select id='awayTeam2' name='awayTeam2' value={awayTeam2} onChange={onChange}>
                {createDropdowns(results[1])}
                </select>
                <br></br>
            <label htmlFor='homeTeam4'>3rd Place Division 1: </label>
                <select id='homeTeam4' name='homeTeam4' value={homeTeam4} onChange={onChange}>
                {createDropdowns(results[1])}
                </select>
            <label htmlFor='awayTeam4'>4th Place Division 1: </label>
                <select id='awayTeam4' name='awayTeam4' value={awayTeam4} onChange={onChange}>
                {createDropdowns(results[1])}
                </select>
                <br></br>
        </div>
    )

    const completeForm = (
        <div>
            <div>
        <h4>Final Standings </h4>
            <label htmlFor='first'>1st Place: </label>
                <select id='first' name='first' value={first} onChange={onChange}>
                {createCompleteDropdowns()}
                </select>
                
                <br></br>
            <label htmlFor='second'>2nd Place: </label>
                <select id='second' name='second' value={second} onChange={onChange}>
                    {createCompleteDropdowns()}
                </select>
                <br></br>
            <label htmlFor='third'>3rd Place: </label>
                <select id='third' name='third' value={third} onChange={onChange}>
                {createCompleteDropdowns()}
                </select>
                <br></br>
            <label htmlFor='fourth'>4th Place: </label>
                <select id='fourth' name='fourth' value={fourth} onChange={onChange}>
                {createCompleteDropdowns()}
                </select>
                <br></br>
                <label htmlFor='fifth'>5th Place: </label>
                <select id='fifth' name='fifth' value={fifth} onChange={onChange}>
                {createCompleteDropdowns()}
                </select>
                <br></br>
                <label htmlFor='sixth'>6th Place: </label>
                <select id='sixth' name='sixth' value={sixth} onChange={onChange}>
                {createCompleteDropdowns()}
                </select>
                <br></br>
                <label htmlFor='seventh'>7th Place: </label>
                <select id='seventh' name='seventh' value={seventh} onChange={onChange}>
                {createCompleteDropdowns()}
                </select>
                <br></br>
                <label htmlFor='eighth'>8th Place: </label>
                <select id='eighth' name='eighth' value={eighth} onChange={onChange}>
                {createCompleteDropdowns()}
                </select>
                <br></br>
        </div>
        </div>
    )


  return (
    <div className='eventEditForm'>
        <form onSubmit={onSubmit}>
            <label htmlFor='gameStatus'>Change Status: </label>
                <select id='status' name='status' value={status} onChange={handleStatusChange}>
                    <option value={'Upcoming'}>Upcoming</option>
                    <option value={'In Progress'}>In Progress</option>
            </select>
            <br></br>
            {event.status === 'Upcoming' ? <button onClick={toggleEditDivisions}>Edit Divisions</button> 
            : <></>}
            {event.status === 'In Progress' ? <button onClick={toggleEditPlayoffs}>Edit Playoffs</button> : <></>}
            <br></br>
            {readyForPlayoffs? selectPlayoffs : <></> }
            {event.status === 'In Progress' || event.status === 'Complete'  ? <button onClick={toggleCompleteEvent}>Complete Event</button> : <></>}
            {readyforComplete ? completeForm : <></> }
            <button type='submit' className='btn btn-block'>
                Submit 
            </button>
            <button onClick={calculatePoints(events)}>Recalculate Points</button>
        </form>
        {active? <DivisionForm teams={teams} event={event} /> : <></>}
    </div>
  )
}

export default EventEditForm


 
    