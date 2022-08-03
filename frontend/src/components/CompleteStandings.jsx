import * as React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
        Box, TableSortLabel, Paper } from '@mui/material';
import {useSelector, useDispatch} from 'react-redux'


function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

const headCells = [
    {
        id: 'name',
        numeric: false,
        label: 'Team'
    },
    {
        id: 'points',
        numeric: true,
        label: 'Points'
    },
    {
        id: 'first',
        numeric: true,
        label: 'First Place Finishes'
    },
    {
        id: 'second',
        numeric: true,
        label: 'Second Place Finishes'
    },
    {
        id: 'third',
        numeric: true,
        label: 'Third Place Finishes'
    },
    {
        id: 'fourth',
        numeric: true,
        label: 'Fourth Place Finishes'
    },
]  


function createData(allTeams) {
    let data =  allTeams.map(team =>{
        return { 
            name:team.name,
            points:team.currentPoints,
            first: team.first,
            second: team.second,
            third: team.third,
            fourth: team.fourth,
        };
    })
    return data.sort((a,b) => b.points - a.points)
}


function CompleteStandings() {
    const { teams } = useSelector((state) => state.teams);
    const rows = createData(teams);
  return (
    <div className='standingsTable'>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Team</TableCell>
                        <TableCell>Points</TableCell>
                        <TableCell>First Place Finishes</TableCell>
                        <TableCell>Second Place Finishes</TableCell>
                        <TableCell>Third Place Finishes</TableCell>
                        <TableCell>Fourth Place Finishes</TableCell>
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
                            <TableCell align='center' title={row.first}>{row.first.length}</TableCell>
                            <TableCell align='center' title={row.second}>{row.second.length}</TableCell>
                            <TableCell align='center' title={row.third}>{row.third.length}</TableCell>
                            <TableCell align='center'title={row.fourth}>{row.fourth.length}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>    
        </TableContainer>
    </div>
  )
}

export default CompleteStandings