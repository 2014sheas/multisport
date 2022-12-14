import {useState} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DivisionForm from './DivisionForm';


function EventEditForm({event, playoffs, teams, events, results}) {



   

    const navigate = useNavigate();

    let playoff1 = playoffs[0];
    let playoff2 = playoffs[1];

    const [formData, setFormData] = useState({
        homeTeam1: playoff1.home == 0 ? results[0][0].team: playoff1.home,
        homeTeam2: playoff2.home == 0 ? results[1][0].team: playoff2.home,
        awayTeam1: playoff1.away == 0 ? results[0][1].team: playoff1.away,
        awayTeam2: playoff2.away == 0 ? results[1][1].team: playoff2.away,

        status: event.status,
        first: event.results.length > 0 ? event.results[0] : 0,
        second: event.results.length > 0 ? event.results[1] : 0,
        third: event.results.length > 0 ? event.results[2] : 0,
        fourth: event.results.length > 0 ? event.results[3] : 0,

    });


    const [active, setActive] = useState(false);
    const [readyforComplete, setReadyForComplete] = useState(false);

    const {homeTeam1, homeTeam2, awayTeam1, awayTeam2, 
            status, first, second, third, fourth} = formData;

    

    const toggleCompleteEvent = (e) => {
        e.preventDefault();

        setReadyForComplete((prevState) => (!prevState))
        if(readyforComplete) {
            setFormData((prevState) => ({
                ...prevState,
                status: 'Complete',
            }))
        }
    }
    
    const calculatePoints = (newEvents) =>  {

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
        
        newEvents.forEach(event => {
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
    
        teams.forEach(team => {
          let tID = team.teamID;
          let curTeam = { 
            first: resultstsArr[tID-1][0],
            second: resultstsArr[tID-1][1],
            third: resultstsArr[tID-1][2],
            fourth: resultstsArr[tID-1][3],
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

        let readyForSubmit  = (homeTeam1 != awayTeam1) && (homeTeam2 != awayTeam2);


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
        if(status == 'Complete'){
            let eventResults = [parseInt(first), parseInt(second), parseInt(third), parseInt(fourth)];

            let resultsSet  = [...new Set(eventResults)];

            let readyforCompleteSubmit = resultsSet.length === 4;

            if(readyforCompleteSubmit){

                let newEvent = {
                    ...event,
                    results:eventResults,
                }

                let newEvents = events;
                newEvents[event.eventID - 1] = newEvent;
                calculatePoints(newEvents);

                

                axios.put('/api/events/' + event._id, newEvent)
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
        const teamsList = [1,2,3,4,5,6];
        

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
                <br></br>
            <label htmlFor='homeTeam2'>Winner Division 2: </label>
                <select id='homeTeam2' name='homeTeam2' value={homeTeam2} onChange={onChange}>
                {createDropdowns(results[1])}
                </select>
                <br></br>
            <label htmlFor='awayTeam2'>2nd PLace Division 2: </label>
                <select id='awayTeam2' name='awayTeam2' value={awayTeam2} onChange={onChange}>
                {createDropdowns(results[1])}
                </select>
                <br></br>
                <button onClick={toggleCompleteEvent}>Complete Event</button>
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
            {status != 'Upcoming' ?  selectPlayoffs
            : <button onClick={toggleEditDivisions}>Edit Divisions</button>}
            {readyforComplete ? completeForm : <></> }
            <button type='submit' className='btn btn-block'>
                Submit 
            </button>
        </form>
        {active? <DivisionForm teams={teams} event={event} /> : <></>}
    </div>
  )
}

export default EventEditForm


 
    