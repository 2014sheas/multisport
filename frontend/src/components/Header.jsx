import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa';
import {Link, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {logout, reset} from '../features/auth/authSlice';


function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    }

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
            {user ? (
            <>
                <li>
                    <button className='btn' onClick={onLogout}>
                        <FaSignOutAlt /> Logout
                    </button>
                </li>
                { user.admin ? (
                <li>
                <Link to='/register'>
                    <FaUser /> Admin
                </Link>
                </li>):
                <></>
                }
            </>) : (
            <>
                <li>
                    <Link to='/login'>
                        <FaSignInAlt /> Login
                    </Link>
                </li>
            </>)}
            
        </ul>
    </header>
  )
}

export default Header