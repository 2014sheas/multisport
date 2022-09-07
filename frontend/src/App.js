import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import Standings from './pages/Standings';
import {useSelector, useDispatch} from 'react-redux';
import {useEffect} from 'react'
import { getEvents, reset } from './features/events/eventSlice';
import { getTeams, updateTeam } from './features/teams/teamSlice';
import { getGames, createGame, deleteGame, updateGame } from './features/games/gameSlice';
import EventHeader from './components/EventHeader';
import Schedule from './pages/Schedule';
import DivisionEvent from './pages/DivisionEvent';
import ScoreEvent from './pages/ScoreEvent';




function App() {
  console.log(process.env.REACT_APP_INSTA_TOKEN);
  const dispatch = useDispatch();

  useEffect( () => { 
    dispatch(getEvents());
    dispatch(getTeams());
    dispatch(getGames());
    
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
          <Route path='/events/tennis' element={<DivisionEvent eventname={'tennis'} />}></Route>
          <Route path='/events/hockey' element={<DivisionEvent eventname={'hockey'} />}></Route>
          <Route path='/events/relay' element={<ScoreEvent eventname={'relay'} />}></Route>
          <Route path='/events/kanjam' element={<DivisionEvent eventname={'kanjam'} />}></Route>
          <Route path='/events/bottlebash' element={<DivisionEvent eventname={'bottlebash'} />}></Route>
          <Route path='/events/cornhole' element={<DivisionEvent eventname={'cornhole'} />}></Route>
          <Route path='/events/tugofwar' element={<DivisionEvent eventname={'tugofwar'} />}></Route>
          <Route path='/events/eating' element={<ScoreEvent eventname={'eating'} />}></Route>
          
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
        </Routes>
      </div>
    </Router>
  </>
  );
}

export default App;
