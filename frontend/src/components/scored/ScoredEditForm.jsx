import {useState} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux'

import { getEvents, } from '../../features/events/eventSlice'


function ScoredEditForm({event, teams, events, results}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({

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
    
    const toggleCompleteEvent = (e) => {
        e.preventDefault();

        setReadyForComplete((prevState) => (!prevState))
      }

    const {status, first, second, third, fourth, fifth, sixth, seventh, eighth} = formData;
    
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

            let isSoftball = singleEvent.name === 'Softball';
            let i=0;
            singleEvent.results.forEach(result => {
              let fullPoints = singleEvent.fullPoints;
              resultstsArr[result-1][i++].push(singleEvent.name);
              switch(i){
                case 1:
                  pointsArr[result-1] += fullPoints ? (isSoftball ? 10 : 10) : 5;
                  break;
                case 2:
                  pointsArr[result-1] += fullPoints ? (isSoftball ? 10 : 8) : 4;
                  break;
                case 3:
                  pointsArr[result-1] += fullPoints ? (isSoftball ? 7 : 6) : 3;
                  break;
                case 4:
                  pointsArr[result-1] += fullPoints ? (isSoftball ? 7 : 5) : 2;
                  break;
                case 5:
                  pointsArr[result-1] += fullPoints ? (isSoftball ? 5 : 3) : 1;
                  break;
                case 6:
                  pointsArr[result-1] += fullPoints ? (isSoftball ? 5 : 2) : 1;
                  break;
                case 7:
                  pointsArr[result-1] += fullPoints ? (isSoftball ? 2 : 1) : 0;
                  break;
                case 8:
                  pointsArr[result-1] += fullPoints ? (isSoftball ? 2 : 0) : 0;
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

    

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (readyforComplete){
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
                console.log(events)
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
            {event.status === 'In Progress' || event.status === 'Complete'  ? <button onClick={toggleCompleteEvent}>Complete Event</button> : <></>}
            {readyforComplete ? completeForm : <></> }
            <button type='submit' className='btn btn-block'>
                Submit 
            </button>
            <button onClick={calculatePoints(events)}>Recalculate Points</button>
        </form>
    </div>
  )
}

export default ScoredEditForm


 
    