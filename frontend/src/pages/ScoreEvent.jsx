
import React from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react'
import { getEvents, reset } from '../features/events/eventSlice';
import Spinner from '../components/Spinner';
import Bowling from '../components/scored/bowling/Bowling';



function ScoreEvent({eventname}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { events, isLoading, isError, message } = useSelector((state) => state.events);
  const { teams } = useSelector((state) => state.teams);

  useEffect( () => { 
    if(isError){
      console.log(message);
    }
    dispatch(getEvents())
    return () => {
      dispatch(reset);
    }
  }, [navigate, isError, message, dispatch]);


  let event;
  let scoredComponent = <></>



  if(isLoading){
    return <Spinner />
  }
  if(events.length > 0){
    event = events.find(ev => ev.eventLink === eventname);

    switch(event.eventLink) {
      case 'bowling':
        scoredComponent = <Bowling event={event} teams={teams} events={events}/>
        break;
      case 'soccer':
        console.log('soccer');
        break;
      case 'baseball':
        console.log('baseball');
        break;
      case 'minigolf':
        console.log('minigolf');
        break;
      case 'relay':
        console.log('relay');
        break;
      case 'eating':
        console.log('eating');
        break;
      default:
        console.log('Error: Event not recognized')
    }
  }
  return (
    <div>
      <h1>
        {events.length > 0 ? event.name : 'Event'}
      </h1>
      {scoredComponent}
    </div>
  )
}

export default ScoreEvent