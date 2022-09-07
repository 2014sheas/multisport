import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Spinner from '../components/Spinner'


import { useNavigate } from 'react-router-dom'
import { getMedia, reset } from '../features/media/mediaSlice';




function HomePage() {


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { media, isLoading, isError, message } = useSelector((state) => state.media);

  useEffect( () => { 
    if(isError){
      console.log(message);
    }
    dispatch(getMedia())
    return () => {
      dispatch(reset);
    }
  }, [navigate, isError, message, dispatch]);




  if(isLoading){
    return <Spinner />
  }
  if(media.length > 0){

  }

  const createMediaContent = () => {
    return (<div className='mediaContainer'>
    <img src={media[1].media_url} width={700} height={500} />
    <hr />
    <p>{media[1].caption}</p>
    <h5>*note: this is just a placeholder instagram image/caption feed until an official MultiSport account is created</h5>
  </div>)
  }

  return (
    <div>
      <br />
      <br />
      <section className="content">
      {media.length > 0 ? createMediaContent() : <></>}
      </section>
      

    </div>
  )
}

export default HomePage