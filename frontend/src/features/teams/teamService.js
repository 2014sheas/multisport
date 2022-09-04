import axios from 'axios';

const API_URL = '/api/teams/';

//Get all teams
const getTeams = async () => {
    const response = await axios.get(API_URL);
    
    return response.data;
}



const teamService = {
    getTeams,
}

export default teamService;
