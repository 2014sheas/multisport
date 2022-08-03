
import React from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {useEffect} from 'react'
import { getEvents, reset } from '../features/events/eventSlice';
import { getTeams, updateTeam } from '../features/teams/teamSlice'

function ScoreEvent({eventname}) {
  const dispatch = useDispatch();
  let event;

  const { events } = useSelector((state) => state.events);
  useEffect( () => { 
    dispatch(getEvents());
    dispatch(getTeams());
    
  }, []);

  event = events.find(ev => ev.eventLink === eventname);
  


  return (
    <div>
      <h1>
        {event.name}
      </h1>
    </div>
  )
}

export default ScoreEvent