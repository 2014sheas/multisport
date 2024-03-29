import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Spinner from '../components/Spinner'
import PartialStandings from '../components/homepage/PartialStandings';
import GameSidebar from '../components/homepage/GameSidebar';
import { Carousel } from 'react-responsive-carousel';

import "react-responsive-carousel/lib/styles/carousel.min.css";


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

    //use this to select which posts to display in carousel, would default be [0,1,2,3,4]
    let selectedSlides = [0];

    let slides = selectedSlides.map((index) => {
      return (
        <div>
          <img src={media[index].media_url} height='600px' width='600px' alt={media[index].caption} />
          <p className='legend'>{media[index].caption}</p>
        </div>
      )
    })

    return (
      <Carousel showArrows={true} showThumbs={false} infiniteLoop={true} autoPlay={true} interval={5000}>
        {slides}
      </Carousel>
      )
  }

  return (
    <div>
      <br />
      <br />
      <h4>
      </h4>
      <div className='homePageContent'>
        <GameSidebar />
        {/* <div className='mediaContainer'>
          {media.length > 0 ? createMediaContent() : <></>}
        </div> */}
        <PartialStandings />
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      
      

    </div>
  )
}

export default HomePage