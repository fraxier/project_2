import { Alert, LinearProgress, Paper, TextField, Tooltip, tooltipClasses, Typography } from '@mui/material';
import { styled } from '@mui/material/styles'

import { Box } from '@mui/system';
import HelpIcon from '@mui/icons-material/Help';
import React, { useState } from 'react';

const illegalChars = `,./<>?;':"[]\\{}|\` `

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));

const CheckUsername = async (name) => {

    console.log(`Checking: ${name}`);

    const results = await fetch('https://api.jsonbin.io/v3/b/630eddeee13e6063dc934483', {
      method: 'GET',
      headers: {
        'X-Master-Key': '$2b$10$Rjvmn7PaK51qkUKCqg1l5uYHjdC4Wo.Sft4njUYdx.KAX9HClFVnO'
      }
    })
      .then(response => response.json());

    return results
}

const PostUsername = async (name) => {

  return fetch('https://api.jsonbin.io/v3/b/630eddeee13e6063dc934483', {
    method: 'POST',
    headers: {
      'X-Master-Key': '$2b$10$Rjvmn7PaK51qkUKCqg1l5uYHjdC4Wo.Sft4njUYdx.KAX9HClFVnO',
      "Content-Type": "application/json"
    },
    body: JSON.stringify({"username": name})
  }).then(response => {
    const res = response.json();
    console.log(res)
    return res;
  }).then(obj => {
    console.log(obj);
  })

}

export default function Login({ setUser }) {
	const [username, setUsername] = useState('');
  const [label, setLabel] = useState('username');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [usernameTaken, setUsernameTaken] = useState(false)

  const usernameHandler = event => {
    if (illegalChars.includes(event.nativeEvent.data)) {
      setError(true)
      setLabel('Invalid character')
    } else {
      if (error) setError(false) || setLabel('username')
      setUsernameTaken(false)
      setUsername(event.target.value)
    }
  }

  const usernameEnter = async event => {

    if (event.key === 'Enter') {
      setIsLoading(true);
      setUsernameTaken(false);
      const results = await CheckUsername(username);
      console.log(results)
      const hasDuplicate = !!(results.record.find(item => item.username.toLowerCase() === username.toLowerCase()))
      console.log(hasDuplicate);

      if (hasDuplicate) {
        setError(true)
        setIsLoading(false)
        setUsernameTaken(true)
        return;
      }
      await PostUsername(username);
      // setUser(username);
    }
  }

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mt: 10 }}>
			<Typography variant='h4' textAlign={'center'}>
				Welcome!
			</Typography>
			<Typography variant='h6' textAlign={'center'}>
				Create a username
			</Typography>
      <Alert severity='error' sx={{ display: usernameTaken ? 'block' : 'none' }}>
        The username 
        <Typography variant='code'>
          {` ${username} `}
        </Typography>
        has been taken
      </Alert>
			<Paper elevation={2} sx={{ p: 4, width: 200, border: {}, position: 'relative' }}>
        <Tooltip 
          title={
            <React.Fragment>
              <Typography color="inherit">Please don't use any of these characters: ${illegalChars}[spacebar]</Typography>
            </React.Fragment>
          }
          placement='right'
          sx={{ position: 'absolute', left: 0, top: 0, display: error ? 'block' : 'none' }}>
          <HelpIcon color='error'/>
        </Tooltip>
				<TextField
          required
          variant='outlined'
          error={error}
          id='username'
          label={label}
          value={username}
          onChange={usernameHandler}
          onKeyDown={usernameEnter}
        />
        <LinearProgress sx={{ display: isLoading ? 'block' : 'none' }}/>
			</Paper>
		</Box>
	);
}
