import { Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function Session({ hangul, user }) {
	const [record, setRecord] = useState();

	const id = useParams();

	useEffect(() => {
		fetch('http://localhost:3001/sessions/' + id.id)
			.then((response) => response.json())
			.then((obj) => {
				console.log('obj ', obj);
				const tempRecord = { date: obj.date, data: [] };
				obj.data.map((item) => {
					console.log('item ', item);
					const data = { id: item.hid, correct: item.correct };
					const properties = hangul.find((h) => h.id === item.hid);
					console.log('properties ', properties);
					data.name = properties.name + ' ' + (properties.name_kr ? properties.name_kr : '');
					data.hangul = properties.hangul;
					tempRecord.data.push(data);
				});
				console.log('record ', tempRecord);
				setRecord(tempRecord);
			});
	}, []);

	return (
		<>
			{record && (
				<Paper sx={{ p: 7, my: 4 }} elevation={6}>
					<Typography color='primary' variant='h4'>{user.username}'s Practice Session</Typography>
					<Typography color='secondary' variant='h6'>{record.date}</Typography>
					<Typography  component={'b'}>Practiced: {record.data.length}</Typography>
          <TableContainer component={Paper} elevation={3}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell><Typography variant='h6' component='p'>Hangul</Typography></TableCell>
                  <TableCell><Typography variant='h6' component='p'>Name</Typography></TableCell>
                  <TableCell><Typography variant='h6' component='p'>Correct</Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {record.data.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Typography variant='h6' fontSize={30} component='p'>{row.hangul}</Typography>
                    </TableCell>
                    <TableCell><Typography variant='h6' component='p'>{row.name}</Typography></TableCell>
                    <TableCell><Typography variant='h6' component='p'>{row.correct}</Typography></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
					{record.data.map((item) => {
						
					})}
				</Paper>
			)}
		</>
	);
}
