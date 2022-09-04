import {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'
import {FaUser} from 'react-icons/fa'
import Spinner from '../components/Spinner';


function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPass: '',
        admin: false,
        executive: false,
    });

    const {name, email, password, confirmPass, admin, executive} = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user, isLoading, isError, isSuccess, message} = useSelector( 
        (state) => state.auth);

    useEffect(()=> {
        if(isError){
            toast.error(message);
        }

        if(isSuccess || !user.admin){
            navigate('/');
        }

        dispatch(reset());

    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const privilegeChange = (e) => {

        switch(e.target.value){
            case 'admin':
                setFormData((prevState) => ({
                    ...prevState,
                    admin: true,
                    executive: true,
                }))
                break;
            case 'exec':
                setFormData((prevState) => ({
                    ...prevState,
                    admin: false,
                    executive: true,
                }))
                break;
            default:
                setFormData((prevState) => ({
                    ...prevState,
                    admin: false,
                    executive: false,
                }))
        }
    }
    
    const onSubmit = (e) => {
        e.preventDefault();

        if(password !== confirmPass){
            toast.error('Passwords do not match')
        }
        else {
            const userData = {
                name,
                email, 
                password,
                admin, 
                executive,
            }

            dispatch(register(userData));
        }
    }


    if(isLoading){
        return <Spinner />
    }

  return (
    <>
        <section className='heading'>
            <h1>
                <FaUser /> Register New User
            </h1>
            <p>Please create an account</p>
        </section>
        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input type="text" 
                    className='form-control' 
                    id='name' 
                    name='name' 
                    value={name} 
                    placeholder='Enter name'
                    onChange={onChange}/>
                </div>
                <div className="form-group">
                    <input type="email" 
                    className='form-control' 
                    id='email' 
                    name='email' 
                    value={email} 
                    placeholder='Enter your email'
                    onChange={onChange}/>
                </div>
                <div className="form-group">
                    <input type="password" 
                    className='form-control' 
                    id='password' 
                    name='password' 
                    value={password} 
                    placeholder='Enter a password'
                    onChange={onChange}/>
                </div>
                <div className="form-group">
                    <input type="password" 
                    className='form-control' 
                    id='confirmPass' 
                    name='confirmPass' 
                    value={confirmPass} 
                    placeholder='Confirm password'
                    onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="privileges">Special Privileges</label>
                    <select id="privileges" name='privileges' onChange={privilegeChange}>
                        <option value="none">None</option>
                        <option value="exec">Executive</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                
                <div className="form-group">
                    <button type='submit' className='btn btn-block'>
                        Submit 
                    </button>
                </div>
            </form>
        </section>
    </>
  )
}

export default Register