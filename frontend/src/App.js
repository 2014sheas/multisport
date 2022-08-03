import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Header from './components/Header';
import Standings from './pages/Standings';
import {useSelector, useDispatch} from 'react-redux'
import {useEffect} from 'react'
import { getEvents, reset } from './features/events/eventSlice';
import { getTeams, updateTeam } from './features/teams/teamSlice'
import EventHeader from './components/EventHeader';
import Schedule from './pages/Schedule';
import DivisionEvent from './pages/DivisionEvent';
import ScoreEvent from './pages/ScoreEvent';


function App() {
  const dispatch = useDispatch();

  useEffect( () => { 
    dispatch(getEvents());
    dispatch(getTeams());
    
  }, []);

  return (
    <>
    <Router>
      <div className='container'>
        <Header />
        <EventHeader />
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/standings' element={<Standings />}></Route>
          <Route path='/schedule' element={<Schedule />}></Route>
          <Route path='/events/bowling' element={<ScoreEvent eventname={'bowling'}/>}></Route>
          <Route path='/events/soccer' element={<ScoreEvent eventname={'soccer'} />}></Route>
          <Route path='/events/football' element={<DivisionEvent eventname={'football'} />}></Route>
          <Route path='/events/baseball' element={<ScoreEvent eventname={'baseball'} />}></Route>
          <Route path='/events/dodgeball' element={<DivisionEvent eventname={'dodgeball'} />}></Route>
          <Route path='/events/basketball' element={<DivisionEvent eventname={'basketball'} />}></Route>
          <Route path='/events/minigolf' element={<ScoreEvent eventname={'minigolf'} />}></Route>
        </Routes>
      </div>
    </Router>
  </>
  );
}

export default App;
