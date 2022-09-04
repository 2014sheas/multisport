import {useState} from 'react';
import axios from 'axios';
import { getGames, } from '../../features/games/gameSlice';
import {useSelector, useDispatch} from 'react-redux';

function GameEditForm({game, teams, playoffGames}) {


    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        status: game.status,
        homeScore: game.homeScore,
        awayScore: game.awayScore,
        winner: game.winner,
        loser: game.loser
    });

    const [active, setActive] = useState(false);


    const toggleCompleteForm = (e) => {
        e.preventDefault();

        setActive((prevState) => (!prevState))
    }

    const {status, homeScore, awayScore, winner, loser} = formData;
    const homeName = game.home ? teams[game.home -1].name : 'TBD';
    const awayName = game.away ? teams[game.away -1].name : 'TBD';

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const gameData = {
            ...game,
            status,
            homeScore,
            awayScore,
            winner,
            loser,

        }


        axios.put('/api/games/' + game._id, gameData)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })

        //If this was a playoff game, automatically populate the teams in the championship/consolation
        if(playoffGames && playoffGames.length > 0 && status == 'Complete'){
            if(game.gameID == playoffGames[0].gameID){
                const champGame = {
                    ...playoffGames[2],
                    home: winner,
                }
                const consGame = {
                    ...playoffGames[3],
                    home: loser
                }

                axios.put('/api/games/' + champGame._id, champGame)
                    .then(response => {
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(error);
                    })
                axios.put('/api/games/' + consGame._id, consGame)
                    .then(response => {
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
            else if(game.gameID == playoffGames[1].gameID){
                const champGame = {
                    ...playoffGames[2],
                    away: winner,
                }
                const consGame = {
                    ...playoffGames[3],
                    away: loser
                }

                axios.put('/api/games/' + champGame._id, champGame)
                    .then(response => {
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(error);
                    })
                axios.put('/api/games/' + consGame._id, consGame)
                    .then(response => {
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
            else {
                console.log('Error: You shouldnt be here');
                console.log('Playoff game ID did not match either possible playoff game ID')
            }
        }

            dispatch(getGames());
    }

    const handleSelectWinner = (e) => {
        let winningTeam = e.target.value;
        setFormData((prevState) => ({
            ...prevState,
            winner: winningTeam,
            loser: winningTeam == game.home ? game.away : game.home,
            status: 'Complete'
        }
        ))
    }


    const handleStatusChange = (e) => {
        let currentStatus = e.target.value;
        setFormData((prevState) => ({
            ...prevState,
            winner: 0,
            loser: 0,
            status: currentStatus,
            homeScore: currentStatus === 'Upcoming' ? 0: homeScore,
            awayScore: currentStatus === 'Upcoming' ? 0: awayScore,
        }))
    }

    const onCancel = () => {
        setFormData((prevState) => ({
            ...prevState,
            winner: 0,
            loser: 0,
            status: 'In Progress',
        }))
        setActive((false));
    }

    const completeForm = ( 
        <div>
            <label htmlFor="winner">Winner: </label>
            <select id='winner' name='winner' value={winner} onChange={handleSelectWinner}>
                <option value={0} disabled={true}>Select a winner</option>
                <option value={game.home}>{homeName}</option>
                <option value={game.away}>{awayName}</option>
            </select>
            <br></br>
            <button onClick={onCancel}>Cancel</button>
        </div>
    )


  return (
    <div className='gameEditForm'>
        <form onSubmit={onSubmit}>
            <label htmlFor='gameStatus'>Change Status: </label>
            <select id='status' name='status' value={status}onChange={handleStatusChange}>
                <option value={'Upcoming'}>Upcoming</option>
                <option value={'In Progress'}>In Progress</option>
            </select>
            <br></br>
            <label htmlFor='homeScore'> {homeName} Score: </label>
            <input type='number' id='homeScore' name='homeScore' value={homeScore} onChange={onChange} />
            <br></br>
            <label htmlFor='awayScore'> {awayName} Score: </label>
            <input type='number' id='awayScore' name='awayScore' value={awayScore} onChange={onChange} />

            <br></br>
            {status === 'In Progress' ? 
                <button onClick={toggleCompleteForm}>Complete Game  &#9660; </button>
                : <></>
            }
            {active ? completeForm: <></>}

            <button type='submit' className='btn btn-block'>
                Submit 
            </button>
        </form>
    </div>
  )
}

export default GameEditForm