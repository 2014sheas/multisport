import React from 'react'
import {useSelector, useDispatch} from 'react-redux';

function EventTicker({event}) {
  const { teams } = useSelector((state) => state.teams);
  
  let teamNames = teams.map(team => {
    console.log()
    return team.abbreviation;
  })

  const status = event.status;
  let progressColor;
  let content;
  let teamsArr;

  

  switch(status){
    case 'In Progress':
      progressColor = 'gold'
      content = <p>{event.location}</p>
      break;
    case 'Complete':
      progressColor = 'Green'
      content = <div className="completeTicker">
          <div>
            <p>1st: {teamNames[event.results[0]-1]}</p>
            <p>2nd: {teamNames[event.results[1]-1]}</p>
          </div>
          <div>
            <p>3rd: {teamNames[event.results[2]-1]}</p>
            <p>4th: {teamNames[event.results[3]-1]}</p>
          </div>
      </div>
      break;
    default:
      content= <div>
        <p>{event.day} {event.startTime}</p>
        {event.location}
      </div>
      progressColor = 'Orange'
  }





  return (
    <div className="eventTicker">
        <h4>{event.name}</h4>
        {content}
        <div className="progress" style={{color:progressColor}}>{event.status}</div>
    </div>
  ) 
}

export default EventTicker