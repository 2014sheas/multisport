import React from 'react'
import axios from 'axios'
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
    Box, TableSortLabel, Paper } from '@mui/material';

    
const createData  = (data, teams) => { 
    let teamsData = [data.team1, data.team2, data.team3, data.team4, data.team5, data.team6]
    let rawData =  teamsData.map((teamData, index) => {
        let teamTotal = Math.max(teamData[0][0], teamData[0][1]) + 
                        Math.max(teamData[1][0], teamData[1][1]) + 
                        Math.max(teamData[2][0], teamData[2][1]) + 
                        Math.max(teamData[3][0], teamData[3][1]);
        return {
            name:teams[index].name,
            score: teamTotal
        }
    })

    return rawData.sort((a,b) => b.score - a.score);
};

function TeamStandings({scoreData, teams}) {
    const rows = createData(scoreData, teams);

  return (
    <div>
            <div className='bowlingTable'>
                <TableContainer component={Paper}>
                    <Table sx={{ maxWidth: 350 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Team</TableCell>
                                <TableCell>Total Score</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow 
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align='center' >{row.score}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>    
                </TableContainer>
            </div>
        </div>
  )
}

export default TeamStandings