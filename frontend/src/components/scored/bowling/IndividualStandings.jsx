import React from 'react'
import PropTypes from 'prop-types';

import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
    Box, TableSortLabel, Paper } from '@mui/material';
import { visuallyHidden } from '@mui/utils';

    const headCells = [
        {
          id: 'name',
          numeric: false,
          disablePadding: false,
          label: 'Name',
        },
        {
          id: 'team',
          numeric: false,
          disablePadding: false,
          label: 'Team',
        },
        {
          id: 'frame1',
          numeric: true,
          disablePadding: false,
          label: 'Frame1',
        },
        {
          id: 'frame2',
          numeric: true,
          disablePadding: false,
          label: 'Frame2',
        },
        {
          id: 'max',
          numeric: true,
          disablePadding: false,
          label: 'Max',
        },
      ];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

    
const createData  = (data, teams) => {
    let rawData = []; 
    let playerRow = [];
    let teamsData = [data.team1, data.team2, data.team3, data.team4, data.team5, data.team6]
    teamsData.forEach((team, teamInd) => {
        team.forEach((player, playerInd) => {
            playerRow = {
                name: teams[teamInd].members[playerInd],
                team: teams[teamInd].name,
                frame1: parseInt(player[0]),
                frame2: parseInt(player[1]),
                max: Math.max(player[0], player[1])
            }
            rawData.push(playerRow);
        })
    })

    return rawData;
};

function EnhancedTableHead(props) {
    const {order, orderBy, onRequestSort } =
      props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
  };


function IndividualStandings({scoreData, teams}) {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('team');
    const rows = createData(scoreData, teams);


    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
      };

  return (
    <div>
        <div className='bowlingTable2'>
            <TableContainer component={Paper}>
                <Table sx={{ maxWidth: 800 }} aria-label="simple table">
                <colgroup>
                    <col style={{width:'225px'}}/>
                    <col style={{width:'200px'}}/>
                    <col style={{width:'50px'}}/>
                    <col style={{width:'50px'}}/>
                    <col style={{width:'50px'}}/>
                </colgroup>
                    <EnhancedTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                    />
                    <TableBody>
                        {rows.slice().sort(getComparator(order, orderBy)).map((row) => (
                            <TableRow 
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align='center' >{row.team}</TableCell>
                                <TableCell align='center' >{row.frame1}</TableCell>
                                <TableCell align='center' >{row.frame2}</TableCell>
                                <TableCell align='center' >{row.max}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>    
            </TableContainer>
        </div>
    </div>
  )
}

export default IndividualStandings