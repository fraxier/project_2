import { Container } from '@mui/system';
import React, { useState } from 'react';
import { Route, Routes } from 'react-router';
import Dashboard from './Dashboard';
import Hangul from './Hangul';
import Login from './Login';
import Navbar from './Navbar';
import Stats from './Stats';

function App() {
	const [user, setUser] = useState('');



	return (
		<div className='App'>
			<Navbar user={user} />
      <Container sx={{ my: 3}}>
        <Routes>
          {!user && <Route path='/' element={<Login setUser={setUser} />} />}
          {user && <Route path='/' element={<Dashboard />} />}
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='hangul' element={<Hangul />} />
          <Route path='stats' element={<Stats />} />
        </Routes>
      </Container>
		</div>
	);
}

export default App;
