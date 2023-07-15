import {useState, useEffect} from 'react';
import Spinner from '../Spinner';
import { useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import { getGames, createGame, deleteGame, } from '../../features/games/gameSlice'
import { getEvents, } from '../../features/events/eventSlice'
import axios from 'axios';






//Form for selecting what teams are in each division for an event
function DivisionForm({teams, event}) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { games, isLoading, isError, message } = useSelector((state) => 
    state.games)
    
    
    //Using state for each potential team in a division
    const [divisions, setDivisions] = useState({
        div1team1: 0,
        div1team2: 0,
        div1team3: 0,
        div1team4: 0,
        div2team1: 0,
        div2team2: 0,
        div2team3: 0,
        div2team4: 0,
    })

    const {div1team1, div1team2, div1team3, div1team4, div2team1, div2team2, div2team3, div2team4} = divisions;


    const randomizeDivisions = () => {
        let teamsArr = [1,2,3,4,5,6,7,8];
        teamsArr = teamsArr.sort((a, b) => 0.5 - Math.random())
        setDivisions((prevState) => ({
            ...prevState,
        div1team1:teamsArr[0],
        div1team2:teamsArr[1],
        div1team3:teamsArr[2],
        div1team4:teamsArr[3],
        div2team1:teamsArr[4],
        div2team2:teamsArr[5],
        div2team3:teamsArr[6],
        div2team4:teamsArr[7],
        }))

    }

    //function for when the submit button is clicked
    const onSubmit = (e) => {
        e.preventDefault();

        //Check to make sure all eight teams are placed in divisions
        let divs = [div1team1, div1team2, div1team3, div1team4, div2team1, div2team2, div2team3, div2team4];
        let uniqueDivs = [...new Set(divs)];


        
        //check to make sure the default "select a team" is never selected on submit
        let formFilled = true;
        divs.forEach(team => {
            if (team===0) {
                formFilled = false;
            }
        })

        let readyForSubmit = (uniqueDivs.length === 8 && formFilled)

        if(readyForSubmit) {
            let divsForSubmit = [divs.slice(0,4), divs.slice(4)]
            createGames(divsForSubmit);

            let updatedEvent =  {
                                divisions: divsForSubmit,
                                }
            console.log(updatedEvent)
            axios.put('/api/events/' + event._id, updatedEvent)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })

            dispatch(getEvents());
        }
        //Notifications for invalid forms
        else {
            console.log('Invalid Submission');
            if(formFilled) {
                console.log("Please make sure no team is repeated");
            }
            else {
                console.log("Please make sure all team slots are filled");
            }
        }



    }

 

    
    
    const createGames = (newDivisions) => {

        const baseID = (event.eventID * 100)

        if(games.length > 0){games.forEach(game => {
            if(game.gameID > baseID && game.gameID < baseID + 100){

                dispatch(deleteGame(game._id));
            }
        })}
        
        const defaultGame = {
            gameID: baseID,
            event: event.name,
            special: 'none',
            status: 'upcoming',
            home: 0,
            away: 0,
            homeScore: 0,
            awayScore: 0,
            winner: 0,
            loser: 0,
        }

        let gamesData = [   {...defaultGame,
                        gameID: baseID+1,
                        home: newDivisions[0][0],
                        away: newDivisions[0][1],
                        },
                        {...defaultGame,
                        gameID: baseID+3,
                        home: newDivisions[0][2],
                        away: newDivisions[0][3],
                        },
                        {...defaultGame,
                        gameID: baseID+5,
                        home: newDivisions[0][0],
                        away: newDivisions[0][2],
                        },
                        {...defaultGame,
                        gameID: baseID+7,
                        home: newDivisions[0][1],
                        away: newDivisions[0][3],
                        },
                        {...defaultGame,
                        gameID: baseID+9,
                        home: newDivisions[0][0],
                        away: newDivisions[0][3],
                        },
                        {...defaultGame,
                        gameID: baseID+11,
                        home: newDivisions[0][1],
                        away: newDivisions[0][2],
                        },
                        {...defaultGame,
                        gameID: baseID+2,
                        home: newDivisions[1][0],
                        away: newDivisions[1][1],
                        },
                        {...defaultGame,
                        gameID: baseID+4,
                        home: newDivisions[1][2],
                        away: newDivisions[1][3],
                        },
                        {...defaultGame,
                        gameID: baseID+6,
                        home: newDivisions[1][0],
                        away: newDivisions[1][2],
                        },
                        {...defaultGame,
                        gameID: baseID+8,
                        home: newDivisions[1][1],
                        away: newDivisions[1][3],
                        },
                        {...defaultGame,
                        gameID: baseID+10,
                        home: newDivisions[1][0],
                        away: newDivisions[1][3],
                        },
                        {...defaultGame,
                        gameID: baseID+12,
                        home: newDivisions[1][1],
                        away: newDivisions[1][2],
                        },
                        {...defaultGame,
                        gameID: baseID+10,
                        special: 'playoff',
                        },
                        {...defaultGame,
                        gameID: baseID+11,
                        special: 'playoff',
                        },
                        {...defaultGame,
                        gameID: baseID+12,
                        special: 'championship',
                        },
                        {...defaultGame,
                        gameID: baseID+12,
                        special: 'consolation',
                        },
                        {...defaultGame,
                            gameID: baseID+13,
                            special: 'losers1',
                        },
                        {...defaultGame,
                            gameID: baseID+14,
                            special: 'losers2',
                        }
                    ]



        gamesData.forEach(gameData => {
            dispatch(createGame(gameData));
        })
        dispatch(getGames());
    }

    const createDropdowns = () => {
        const teamsList = [1,2,3,4,5,6,7,8];

        

        return teamsList.map(team => <option key ={team}value={team}>{teams[team-1].name}</option>);
    }

    const handleChange = (e) => {
        console.log('Drop')
        setDivisions((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const formContent = <div><h2>Division Editing Form</h2>
    <form onSubmit={onSubmit}>
        <div className='divisionForm'>
            <div>
                <h4>Division 1</h4>
                
                    <select 
                    id='div1team1'
                    name='div1team1'
                    value={div1team1}
                    placeholder='Select a team'
                    onChange={handleChange}>
                        <option value={0} disabled={true}>Select a team</option>
                        {createDropdowns()}
                    </select>
                    <select 
                    id='div1team2'
                    name='div1team2'
                    value={div1team2}
                    placeholder='Select a team'
                    onChange={handleChange}>
                        <option value={0} disabled={true}>Select a team</option>
                        {createDropdowns()}
                    </select><select 
                    id='div1team3'
                    name='div1team3'
                    value={div1team3}
                    placeholder='Select a team'
                    onChange={handleChange}>
                        <option value={0} disabled={true}>Select a team</option>
                        {createDropdowns()}
                    </select><select 
                    id='div1team4'
                    name='div1team4'
                    value={div1team4}
                    placeholder='Select a team'
                    onChange={handleChange}>
                        <option value={0} disabled={true}>Select a team</option>
                        {createDropdowns()}
                    </select>
        </div>
        <div>
                <h4>Division 2</h4>
                <select 
                    id='div2team1'
                    name='div2team1'
                    value={div2team1}
                    placeholder='Select a team'
                    onChange={handleChange}>
                        <option value={0} disabled={true}>Select a team</option>
                        {createDropdowns()}
                    </select><select 
                    id='div2team2'
                    name='div2team2'
                    value={div2team2}
                    placeholder='Select a team'
                    onChange={handleChange}>
                        <option value={0} disabled={true}>Select a team</option>
                        {createDropdowns()}
                    </select><select 
                    id='div2team3'
                    name='div2team3'
                    value={div2team3}
                    placeholder='Select a team'
                    onChange={handleChange}>
                        <option value={0} disabled={true}>Select a team</option>
                        {createDropdowns()}
                    </select><select 
                    id='div2team4'
                    name='div2team4'
                    value={div2team4}
                    placeholder='Select a team'
                    onChange={handleChange}>
                        <option value={0} disabled={true}>Select a team</option>
                        {createDropdowns()}
                    </select>
        </div>
        </div>
        <br></br>
        <div className="form-group">
            <button type='submit' >
                Submit 
            </button>    
        </div>
    </form>
    <button onClick={randomizeDivisions}>Randomize Divisions</button>
    </div>


    if(teams.length < 7) {
        return <Spinner />
    }
  return (
    <div>
        {teams.length < 3 ? <Spinner /> : formContent}
    </div>

  )
}

export default DivisionForm