import { Container } from '@mui/system';
import React, { useState } from 'react';
import { Route, Routes } from 'react-router';
import Dashboard from './Dashboard';
import Error404 from './Error404';
import Hangul from './Hangul';
import Login from './Login';
import Navbar from './Navbar';
import Stats from './Stats';

function App() {
	const [user, setUser] = useState('francis');

	return (
		<div className='App'>
			<Navbar user={user} />
      <Container sx={{ my: 3}}>
        <Routes>
          {!user && <>
            <Route path='/' element={<Login setUser={setUser} />} />
            <Route path='*' element={<Error404 />} />
          </> 
          }
          {user && <>
            <Route path='/' element={<Dashboard user={user} />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='hangul' element={<Hangul />} />
            <Route path='stats' element={<Stats />} />
            <Route path='*' element={<Error404 />} />
          </>
          }
        </Routes>
      </Container>
		</div>
	);
}

export default App;
