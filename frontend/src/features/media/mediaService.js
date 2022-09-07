import axios from 'axios';

const API_URL = 'https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type&access_token=';
const access_token = 'IGQVJYVndJOThva0NHMi04QkRkYi1UTS1tNTVTT2E1TF9peXpsRnhxa2swWFd3TkxKODl5SlpwdUl5ZAEtHQjNIb1lVRXUwYi1IWHVUemowOVlDMkUxS3A3NlN1aTdQRF9aQXhrN0F3'

//Get all posts
const getMedia = async () => {
    const response = await axios.get(API_URL + access_token);


    return response.data.data;
}





const mediaService = {
    getMedia,
}

export default mediaService;
