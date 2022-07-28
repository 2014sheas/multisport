import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Header from './components/Header';
import Standings from './pages/Standings';
import {useSelector, useDispatch} from 'react-redux'
import {useEffect} from 'react'
import { getEvents, reset } from './features/events/eventSlice';
import { getTeams, updateTeam } from './features/teams/teamSlice'


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
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/standings' element={<Standings />}></Route>
        </Routes>
      </div>
    </Router>
  </>
  );
}

export default App;
