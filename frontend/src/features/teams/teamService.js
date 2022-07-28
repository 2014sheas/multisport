import axios from 'axios';

const API_URL = '/api/teams/';

//Get all teams
const getTeams = async () => {
    const response = await axios.get(API_URL);
    
    return response.data;
}

//Get all teams
const updateTeam = async (teamID, teamData) => {

    const response = await axios.put(API_URL + teamID, teamData);
    
    return response.data;
}


const teamService = {
    getTeams,
    updateTeam,
}

export default teamService;
