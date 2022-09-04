import { Alert, Backdrop, Button, Card, LinearProgress, Paper, TextField, Tooltip, tooltipClasses, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { Box, Container } from '@mui/system';
import HelpIcon from '@mui/icons-material/Help';
import React, { useRef, useState } from 'react';

const illegalChars = `,./<>?;':"[]\\{}|\` `;
const jsonURL = 'http://localhost:3001';

export default function Login({ setUser }) {
	const [username, setUsername] = useState('');
	const [label, setLabel] = useState('username');
	const [error, setError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [usernameTaken, setUsernameTaken] = useState(false);
  const [open, setOpen] = useState(false);
  const duplicate = useRef();

	const usernameHandler = (event) => {
		if (illegalChars.includes(event.nativeEvent.data)) {
			setError(true);
			setLabel('Invalid character');
		} else {
			if (error) setError(false) || setLabel('username');
			setUsernameTaken(false);
      const lowerCase = event.target.value.toLowerCase()
      const titleCase = lowerCase ? (lowerCase[0].toUpperCase() + lowerCase.slice(1)) : event.target.value
			setUsername(titleCase);
		}
	};

	const usernameEnter = async (event) => {
		if (event.key === 'Enter') {
			setIsLoading(true);
			setUsernameTaken(false);
			const results = await CheckUsername(username);
			console.log(results);
			const hasDuplicate = results.length > 0
			console.log(hasDuplicate);

			if (hasDuplicate) {
        duplicate.current = results[0];
        setOpen(true)
				setError(true);
				setIsLoading(false);
				setUsernameTaken(true);
				return;
			}
			const user = await PostUsername(username);
      		setUser(user);
		}
	};

  const handleExistingUser = async (flag) => {
    
    if (flag) setUser(duplicate.current)
    setOpen(false)
  }

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mt: 10 }}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <Card sx={{ p:5 }}>
          <Typography textAlign='center'>Username exists</Typography>
          <Typography textAlign='center'>Do you want to login in as {username}?</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', pt: 3}}>
            <Button onClick={() => handleExistingUser(true)} color='secondary' variant='contained'>Yes</Button>
            <Button onClick={() => handleExistingUser(false)} color='secondary' variant='contained' sx={{ ml: 2 }}>No</Button>
          </Box>
        </Card>
      </Backdrop>
			<Typography variant='h4' textAlign={'center'}>
				Welcome!
			</Typography>
			<Typography variant='h6' textAlign={'center'}>
				Create a username
			</Typography>
			<Alert severity='error' sx={{ display: usernameTaken ? 'block' : 'none' }}>
				The username
				<Typography variant='code'>{` ${username} `}</Typography>
				has been taken
			</Alert>
			<Paper elevation={2} sx={{ p: 4, width: 200, border: {}, position: 'relative' }}>
				<Tooltip
					title={
						<React.Fragment>
							<Typography color='inherit'>Please don't use any of these characters: ${illegalChars}[spacebar]</Typography>
						</React.Fragment>
					}
					placement='right'
					sx={{ position: 'absolute', left: 0, top: 0, display: error ? 'block' : 'none' }}>
					<HelpIcon color='error' />
				</Tooltip>
				<TextField required variant='outlined' error={error} id='username' label={label} value={username} onChange={usernameHandler} onKeyDown={usernameEnter} />
				<LinearProgress sx={{ display: isLoading ? 'block' : 'none' }} />
			</Paper>
		</Box>
	);
}

const CheckUsername = async (name) => {

  console.log(`Checking: ${name}`);
	const results = await fetch(`${jsonURL}/users?username=${name}`, {
		method: 'GET',
	}).then((response) => {
		const res = response.json();
		console.log(res);
		return res;
	})
	  .catch(error => {
		console.log(error);
	  });

	return results;
};

const PostUsername = async (name) => {
	const user = await fetch(`${jsonURL}/users`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ "username": name  }),
	})
		.then((response) => {
			const res = response.json();
			console.log(res);
			return res;
		});
    return user;
};
