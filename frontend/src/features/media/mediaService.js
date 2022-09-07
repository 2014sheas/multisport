import axios from 'axios';

const API_URL = 'https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type&access_token=';
const access_token = process.env.REACT_APP_INSTA_TOKEN;

//Get all posts
const getMedia = async () => {

    const response = await axios.get(API_URL + access_token);


    return response.data.data;
}





const mediaService = {
    getMedia,
}

export default mediaService;
