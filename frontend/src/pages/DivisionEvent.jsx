import React from 'react'
import {useSelector, useDispatch} from 'react-redux';

function DivisionEvent({eventname}) {
  const { events } = useSelector((state) => state.events);
  let event = events.find(ev => ev.eventLink === eventname);


  return (
    <div>
      <h1>
        {event.name}
      </h1>
    </div>
  )
}

export default DivisionEvent