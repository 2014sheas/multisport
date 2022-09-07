
import React from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react'
import { getEvents, reset } from '../features/events/eventSlice';
import Spinner from '../components/Spinner';
import DivisionContent from '../components/divisions/DivisionContent';





function DivisionEvent ({eventname}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { events, isLoading, isError, message } = useSelector((state) => state.events);

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


  if(isLoading){
    return <Spinner />
  }
  if(events.length > 0){
    event = events.find(ev => ev.eventLink === eventname);
  }
  return (
    <div>
      <h1>
        {events.length > 0 ? event.name : 'Event'}
      </h1>
      {events.length > 0 ? <DivisionContent event={event} events={events} /> : <></>}
    </div>
  )
}

export default DivisionEvent