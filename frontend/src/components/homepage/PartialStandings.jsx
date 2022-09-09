import React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
    Box, TableSortLabel, Paper } from '@mui/material';
import {useSelector, useDispatch} from 'react-redux';


function createData(allTeams) {
    let data =  allTeams.map(team =>{
        return { 
            name:team.name,
            points:team.currentPoints,
        };
    })
    return data.sort((a,b) => b.points - a.points)
}

function PartialStandings() {
    const { teams } = useSelector((state) => state.teams);
    const rows = createData(teams);
  return (
    <div className='partialStandings'>
        <TableContainer >
            <Table sx={{ minWidth: 150 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Team</TableCell>
                        <TableCell>Points</TableCell>
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
                            <TableCell align='center'>{row.points}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>    
        </TableContainer>
    </div>
  )
}

export default PartialStandings