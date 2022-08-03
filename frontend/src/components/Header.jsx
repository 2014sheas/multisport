import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux';


function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    
  return (
    <header className='header'>
        <div className="logo">
            <Link to='/'>MultiSport</Link>
        </div>
        <ul>
            
            <li>
                <div className="dropdown">
                    <button className="dropbtn">Events</button>
                    <div className="dropdown-content">
                        <Link to='/events/bowling'>Bowling</Link>
                        <Link to='/events/soccer'>Penalty Kicks</Link>
                        <Link to='/events/football'>Football</Link>
                        <Link to='/events/baseball'>HR Derby</Link>
                        <Link to='/events/dodgeball'>Dodgeball</Link>
                        <Link to='/events/basketball'>Basketball</Link>
                        <Link to='/events/minigolf'>Mini Golf</Link>
                    </div>
                </div>
            </li>
            <li>
                <Link to='/standings'>Standings</Link>
            </li>
            <li>
                <Link to='/schedule'>Schedule</Link>
            </li>
            {/*<li>
            <div className="dropdown">
                    <button className="dropbtn">Teams</button>
                    <div className="dropdown-content">
                        <Link to='/teams/team1'>Bowling</Link>
                        <Link to='/teams/team2'>Penalty Kicks</Link>
                        <Link to='/teams/team3'>Football</Link>
                        <Link to='/teams/team4'>HR Derby</Link>
                        <Link to='/teams/team5'>Dodgeball</Link>
                        <Link to='/teams/teams6'>Basketball</Link>
                    </div>
                </div>
            </li>*/}
        </ul>
    </header>
  )
}

export default Header