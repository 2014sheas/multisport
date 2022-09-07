import { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Dialog} from "@mui/material";

import DivisionForm from './DivisionForm';
import GameTicker from './GameTicker';
import DivisionStandings from './DivisionStandings';
import EventEditForm from './EventEditForm';

function DivisionContent({event}) {
    const { teams } = useSelector((state) => state.teams);
    const { games } = useSelector((state) => state.games);
    const {user, isLoading, isError, isSuccess, message} = useSelector( 
      (state) => state.auth);

    const [open, setOpen] = useState(false);

    const handleClickToOpen = () => {
      setOpen(true);
    };

    const handleToClose = () => {
      setOpen(false);
    };
  

    const divisions = event.divisions;
    let hasDivisions = divisions[0].length === 3 && event.divisions[1].length === 3;
    let relevantGames = [];
    let regularGames  = [];
    let playoffs = [];
    let championship = [];
    let consolation = [];
    let results = [];

    let regularGameTickers = [];
    let playoffTickers = [];
    let championshipTicker = [];
    let consolationTicker = [];

    //Basic structure for use in calculating standings
    let teamResult = {
      team: 0,
      division: 0,
      wins: 0,
      gamesRem: 3,
      losses: 0,
      pointsFor: 0,
      pointsAgainst: 0,
      winPct: 0.0,
    }

    //function for populating array for use in calculating division standings
    const calcTeamResults = () =>{ 
      let teamResults = teams.map((team) => {
        let inDiv1 = false;
        divisions[0].forEach((teamInDiv) => {
          if(teamInDiv == team.teamID){
            inDiv1 = true;
          }
        })

        return ({
          ...teamResult,
          team: team.teamID,
          division: (inDiv1 ? 1 : 2),
          })
      });

      if(teamResults.length > 0){
        regularGames.forEach((game) => {

          if(game.status === 'Complete'){

            let {winner, loser, home, homeScore, awayScore} = game;

            let winScore = winner == home ? homeScore : awayScore;
            let loseScore = loser == home ? homeScore : awayScore;
            let winResult = teamResults[winner - 1];
            let loseResult = teamResults[loser - 1];
            
            teamResults[winner - 1] = {
              ...winResult,
              wins: winResult.wins + 1,
              pointsFor: winResult.pointsFor + winScore,
              pointsAgainst: winResult.pointsAgainst + loseScore,
              gamesRem: winResult.gamesRem - 1,
              winPct: ((winResult.wins+1)*1.0/(4-winResult.gamesRem)),
            }

            teamResults[loser - 1] = {
              ...loseResult,
              losses: loseResult.losses + 1,
              pointsFor: loseResult.pointsFor + loseScore,
              pointsAgainst: loseResult.pointsAgainst + winScore,
              gamesRem: loseResult.gamesRem - 1,
              winPct: ((loseResult.wins)*1.0/(4-loseResult.gamesRem)),
            }
            
          }
        })

        let div1Teams = [];
        let div2teams = [];

        teamResults.forEach((result) => {
          result.division == 1 ? div1Teams.push(result) : div2teams.push(result);
        })

        return [div1Teams.sort((b,a) => a.winPct - b.winPct), div2teams.sort((b,a) => a.winPct - b.winPct)];

      }
    }



    //function for creating rows of game Tickers 
    const createGameRows = (gamesArray) => {
      let highIndex = 3;
      let lowIndex = 0;
      let currentRow;
      let allRows = [];
      let arrLen = gamesArray.length;

      //create a row with 3 game tickers
      while(highIndex <= arrLen){
        currentRow = (
          <div className='gameRow' key={lowIndex}>
            {gamesArray.slice(lowIndex, highIndex)}
          </div>
        )
        allRows.push(currentRow);
        lowIndex+=3;
        highIndex+=3;
      }

      //create row with less than 3 tickers
      if(arrLen%3){
        highIndex = arrLen;
        lowIndex = arrLen - (4-arrLen%3);

        allRows.push(
          <div className='shortRowContainer' key={lowIndex}>
            {gamesArray.slice(lowIndex, highIndex)}
          </div>
        )
      }
      return allRows;
     }

     //if event has no divisions, admin must create them
    if(!hasDivisions){
        return (
          <div>
              {(user && user.admin ?
                (teams.length > 1 ? <DivisionForm teams={teams} event={event}/> : <></>):
                <h2>Please wait for an admin to create divisions for this event</h2>)
                }
          </div>
        )
    }
    else {


      const baseID = event.eventID * 100;
      if(games.length > 0){
        relevantGames = (games.filter(game => (
          game.gameID > baseID && game.gameID < (baseID + 100)
        ))).sort((a,b) => a.gameID - b.gameID);

        relevantGames.forEach(game => {
          switch (game.special){
            case 'playoff':
              playoffs.push(game);
              break;
            case 'championship':
              championship.push(game);
              break;
            case 'consolation':
              consolation.push(game);
              break;
            default: 
              regularGames.push(game);
          }
        });

        regularGameTickers = regularGames.map((game) => {
          return (<GameTicker game={game} teams={teams}  key={game.gameID}/>)
        })
        
        playoffTickers = playoffs.map((game) => {
          return (<GameTicker game={game} teams={teams}  playoffGames={[playoffs[0], playoffs[1], championship[0], consolation[0]]}key={game.gameID}/>)
        })

        championshipTicker = championship.map((game) => {
          return (<GameTicker game={game} teams={teams}  key={game.gameID}/>)
        })

        consolationTicker = consolation.map((game) => {
          return (<GameTicker game={game} teams={teams}  key={game.gameID}/>)
        })
        

        results = calcTeamResults();
      }

    }

    
    const editEventDialog = (
      <Dialog open={open} onClose={handleToClose}>
        <EventEditForm event={event} playoffs={playoffs} teams={teams} results={results} />
      </Dialog>
    );
  
     
    


  return (
    <div>
      {editEventDialog}
      {user && user.admin ? 
        <button className='editEvent' onClick={handleClickToOpen} >edit event</button>
          : <></>}
      {results && results.length > 0 ? 
      <div className='divisionStandingsContainer'>
        <DivisionStandings results={results[0]} teams={teams} />
        <DivisionStandings results={results[1]} teams={teams} />
      </div>
      : <></>
      }
      <br></br>
      <h2>Division Games</h2>
      <div className='gameRowContainer'>
          {createGameRows(regularGameTickers)}
      </div>
      <br></br>
      <br></br>
      <div className='playoffRowContainer'>
        <h2>Playoffs</h2>
          {createGameRows(playoffTickers)}
      </div>
      <br></br>
      <br></br>
      <div className='champCons'>
        <div className='champCol'>
          <h2>Championship</h2> 
          {championshipTicker}
        </div>
        <div className='champCol'> 
          <h2>Consolation</h2>
          {consolationTicker}
        </div>
      </div>
      <br></br>
      <br></br>
    
    </div>
  )
}

export default DivisionContent