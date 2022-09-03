import React, { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Paper, styled, Typography } from "@mui/material";


export default function Hangul( { hangul, user } ) {

  function createData(id, name, correct, half, wrong, isVowel, name2, vowelSound, startSound, syllableSound, endSound) {
    return { id, name, correct, half, wrong, isVowel, name2, vowelSound, startSound, syllableSound, endSound };
  }

  const [rows, setRows] = useState([]);

  async function getStats() {
    console.log('fetching data')
    const stats = await fetch(`http://localhost:3001/stats?userID=${user.id}`)
      .then(response => response.json())
    return stats[0].data;
  }

  useEffect(() => {
    getStats().then((stats) => {
      const tempRows = []
      
      hangul.forEach((h) => {
        const hStat = stats.find(i => i.hid === h.id) 
        
        const correct = hStat ? hStat.correctCount : 0
        const half = hStat ? hStat.halfCount : 0
        const wrong = hStat ? hStat.wrongCount : 0
        const vowelSound = (h.isVowel && h.pronounciation[0]) ? h.pronounciation[0] : 'N/A'
        const startSound = (!h.isVowel && h.pronounciation[0]) ? h.pronounciation[0] : 'N/A'
        const syllableSound = (!h.isVowel && h.pronounciation[1]) ? h.pronounciation[1] : 'N/A'
        const endSound = (!h.isVowel && h.pronounciation[2]) ? h.pronounciation[2] : 'N/A'
        const name2 = h.name + ' ' + (h.name_kr ? h.name_kr : '')
        
        tempRows.push(createData(h.id, h.hangul, correct, half, wrong, h.isVowel.toString(), name2, vowelSound, startSound, syllableSound, endSound))
      })
      console.log('setting rows')
      setRows(tempRows);
    })
  }, [])

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      fontSize: 18
    },
    [`&.${tableCellClasses}`]: {
      fontSize: 18,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.primary.lighter
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
    <>
      <Typography variant="h3" color="primary" sx={{ my: 5 }}>{user.username}'s Hangul List</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, backgroundColor: '#e1bee7', fontSize:18 }} aria-label="simple table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center">#</StyledTableCell>
              <StyledTableCell align="center">Hangul</StyledTableCell>
              <StyledTableCell align="center">Correct</StyledTableCell>
              <StyledTableCell align="center">Half Right</StyledTableCell>
              <StyledTableCell align="center">Wrong</StyledTableCell>
              <StyledTableCell align="center">Is Vowel</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Vowel Sound</StyledTableCell>
              <StyledTableCell align="center">Start of Word Sound</StyledTableCell>
              <StyledTableCell align="center">Start of Syllable Sound</StyledTableCell>
              <StyledTableCell align="center">End of Word Sound</StyledTableCell>
              
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <StyledTableCell align="center" sx={{ fontSize: 18 }} >{row.id}</StyledTableCell>
                <StyledTableCell align="center" sx={{ fontSize: 30 }} >{row.name}</StyledTableCell>
                <StyledTableCell align="center" sx={{ fontSize: 18 }} >{row.correct}</StyledTableCell>
                <StyledTableCell align="center" sx={{ fontSize: 18 }} >{row.half}</StyledTableCell>
                <StyledTableCell align="center" sx={{ fontSize: 18 }} >{row.wrong}</StyledTableCell>
                <StyledTableCell align="center" sx={{ fontSize: 18 }} >{row.isVowel}</StyledTableCell>
                <StyledTableCell align="center" sx={{ fontSize: 18 }} >{row.name2}</StyledTableCell>
                <StyledTableCell align="center" sx={{ fontSize: 18 }} >{row.vowelSound}</StyledTableCell>
                <StyledTableCell align="center" sx={{ fontSize: 18 }} >{row.startSound}</StyledTableCell>
                <StyledTableCell align="center" sx={{ fontSize: 18 }} >{row.syllableSound}</StyledTableCell>
                <StyledTableCell align="center" sx={{ fontSize: 18 }} >{row.endSound}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
    </>
  )
}