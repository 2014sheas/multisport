import axios from 'axios';

const API_URL = '/api/games/';

//Create a game
const createGame = async (gameData) => {     

    const response = await axios.post(API_URL, gameData);

    return response.data;
}

//Get all games
const getGames = async () => {
    const response = await axios.get(API_URL);


    return response.data;
}



//Delete a game
const deleteGame = async (gameID) => {

    const response = await axios.delete(API_URL + gameID);
    
    return response.data;
}




const gameService = {
    createGame,
    getGames,
    deleteGame
}

export default gameService;
