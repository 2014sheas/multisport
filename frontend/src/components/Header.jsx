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
                <Link to='/standings'>Standings</Link>
            </li>
            <li>
                <Link to='/'>Schedule</Link>
            </li>
            <li>
                <Link to='/'>Events</Link>
            </li>
            <li>
                <Link to='/'>Teams</Link>
            </li>
        </ul>
    </header>
  )
}

export default Header