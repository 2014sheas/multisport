import axios from 'axios';

const API_URL = '/api/events';

//Get all events
const getEvents = async () => {
    const response = await axios.get(API_URL);


    return response.data;
}


const eventService = {
    getEvents,
}

export default eventService;
