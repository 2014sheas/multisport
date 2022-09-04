import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import EventTicker from './EventTicker';


function EventHeader() {
    const { events } = useSelector((state) => state.events);

    const eventArr = events.map((event) => {
        return <EventTicker key={event.eventID} event={event}/>
    })


  return (
    <div className="eventHeader">
        {eventArr}
    </div>
        
  )
}

export default EventHeader