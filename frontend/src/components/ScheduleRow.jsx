import React from 'react'

function ScheduleRow({event}) {
  let progressColor;

  switch(event.status){
    case 'In Progress':
      progressColor = 'gold'
      break;
    case 'Complete':
      progressColor = 'Green'
      break;
    default:
      progressColor = 'Orange'
  }

  return (

    <div className='schedRow'>
      <h3>{event.name}</h3>
      <ul>
        <li>
          {event.startTime}
        </li>
        <li>
          {event.location}
        </li>
        <li style={{color:progressColor}}>
          {event.status}
        </li>
      </ul>
    
    </div>

    
  )
}

export default ScheduleRow