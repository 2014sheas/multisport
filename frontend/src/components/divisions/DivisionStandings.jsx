import React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
    Box, TableSortLabel, Paper } from '@mui/material';

    const headCells = [
    {
        id: 'name',
        numeric: false,
        label: 'Team'
    },
    {
        id: 'wins',
        numeric: true,
        label: 'Wins'
    },
    {
        id: 'losses',
        numeric: true,
        label: 'Losses'
    },
    {
        id: 'pointsFor',
        numeric: true,
        label: 'Points For'
    },{
        id: 'pointsAgainst',
        numeric: true,
        label: 'Points Against'
    },
]  


const createData  = (results, teams) => { 
    return results.map(result =>{
        return { 
            name:teams[result.team-1].name,
            wins: result.wins,
            losses: result.losses,
            pointsFor: result.pointsFor,
            pointsAgainst: result.pointsAgainst,
        };  
    });
};


function DivisionStandings({results, teams}) {
    const rows = createData(results, teams);

    return (
        
        <div>
            <h3>Division {results[1].division}</h3>
            <div className='divisionTable'>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 350 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell>Wins</TableCell>
                                <TableCell>Losses</TableCell>
                                <TableCell>Points For</TableCell>
                                <TableCell>Points Agaisnt</TableCell>
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
                                    <TableCell align='center' >{row.wins}</TableCell>
                                    <TableCell align='center' >{row.losses}</TableCell>
                                    <TableCell align='center' >{row.pointsFor}</TableCell>
                                    <TableCell align='center' >{row.pointsAgainst}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>    
                </TableContainer>
            </div>
        </div>
        
      )
}

export default DivisionStandings