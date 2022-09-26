import React from 'react'
import Spinner from '../../Spinner';





function BowlingScores({event, teams}) {
  let rawScores = event.scoreData;
  let scores = [rawScores.team1, rawScores.team2, rawScores.team3, rawScores.team4, rawScores.team5, rawScores.team6]
  console.log(scores)

  const createTeamSections = () => {
    const teamArr = [0,1,2,3,4,5];
    const playerArr = [0,1,2,3];
    return teamArr.map((teamNum) => {
            
        return (<div className='bowlingTeam' >
                <h3>{teams[teamNum].name}</h3>
                <div className="bowlingRow">
                  <p className='frame1'>Frame 1: </p>
                  <p className='frame2'>Frame 2: </p>
                </div>
                <br />
          {playerArr.map((player) => {
                return (
                    <div className='bowlingRow'>
                      <label>{teams[teamNum].members[player]}: </label>
                      <p className='frame1'>{scores[teamNum][player][0]} </p>
                      <p className='frame2'>{scores[teamNum][player][1]} </p>
                      <p className='bowlingMax'>max: {Math.max(scores[teamNum][player][0], scores[teamNum][player][1],)} </p>
                    </div>
                )
            })
            }
            <h5>Score: {Math.max(scores[teamNum][0][0], scores[teamNum][0][1]) + 
              Math.max(scores[teamNum][1][0], scores[teamNum][1][1]) + 
              Math.max(scores[teamNum][2][0], scores[teamNum][2][1]) +
              Math.max(scores[teamNum][3][0], scores[teamNum][3][1])}
            </h5>
        </div>)
    })
}


  if(!event || teams.length<6){
    return <Spinner />
  }
  return (
    <div>
      {createTeamSections()}
    </div>

  )
}

export default BowlingScores