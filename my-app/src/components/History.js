import { Box, breadcrumbsClasses, Card, Chip, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

export default function History({ hangul, user }) {
	const [history, setHistory] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const populateHistory = async () => {
			const data = await getHistory(user.id);
			console.log(data);

			const tempRows = [];

			data.forEach((record) => {
				const entry = {};
        entry.id = record.id;
				entry.date = record.date;
				entry.count = record.data.length;
				let correctCount = 0,
					halfCount = 0,
					wrongCount = 0;
				record.data.forEach((session) => {
					switch (session.correct) {
						case 1:
							correctCount++;
							break;
						case 0.5:
							halfCount++;
							break;
						case 0:
							wrongCount++;
							break;
					}
				});
				entry.correct = correctCount;
				entry.half = halfCount;
				entry.wrong = wrongCount;
				tempRows.push(entry);
			});
			setHistory(tempRows);
		};
		populateHistory();
	}, []);

	const handleClick = (id) => {
		navigate('/history/' + id);
	};

	return (
		<>
			<Typography color='primary' sx={{ my: 5 }} variant='h3'>
				{user.username}'s Practice History
			</Typography>
			<Paper elevation={6} sx={{ display: 'flex', flexDirection: 'row', p: 4, gap: 3, flexWrap: 'wrap' }}>
				{history.map((item) => {
					return (
						<Card key={item.id} elevation={3} sx={{ p: 2 }}>
							<Chip label={item.date} sx={{ mb: 2 }} color='secondary' onClick={() => handleClick(item.id)} />
							<Box>
								<Typography>Practiced: {item.count}</Typography>
								<Typography>Correct: {item.correct}</Typography>
								<Typography>Half Right: {item.half}</Typography>
								<Typography>Wrong: {item.wrong}</Typography>
							</Box>
						</Card>
					);
				})}
			</Paper>
		</>
	);
}

const getHistory = async (id) => {
	return await fetch(`http://localhost:3001/sessions?userID=${id}`).then((res) => {
		const response = res.json();
		return response;
	});
};
