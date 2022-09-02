import { Container } from '@mui/system';
import React, { useState } from 'react';
import { Route, Routes } from 'react-router';
import Dashboard from './Dashboard';
import Error404 from './Error404';
import Hangul from './Hangul';
import Login from './Login';
import Navbar from './Navbar';
import Practice from './Practice';
import Stats from './Stats';

const testData = [
    {
      "id": 1,
      "name": "giyok",
      "name_kr": "기역",
      "hangul": "ㄱ",
      "pronounciation": [
        "k (kite)",
        "g (ghost)",
        "k (walk)"
      ],
      "isVowel": false
    },
    {
      "id": 2,
      "name": "ssang giyok",
      "name_kr": "쌍기역",
      "hangul": "ㄲ",
      "pronounciation": [
        "g (gone)"
      ],
      "isVowel": false
    },
    {
      "id": 26,
      "name": "ae",
      "hangul": "ㅐ",
      "pronounciation": [
        "ae (at)"
      ],
      "isVowel": true
    },
    {
      "id": 27,
      "name": "eh",
      "hangul": "ㅔ",
      "pronounciation": [
        "eh (met)"
      ],
      "isVowel": true
    },
	]


function App() {
	const [user, setUser] = useState({ username: "Francis", id: 1});
  const [hangul, setHangul] = useState(testData)
	const [sessionData, setSessionData] = useState(hangul);

	return (
		<div className='App'>
			<Navbar user={user} />
			<Container sx={{ my: 3 }}>
				<Routes>
					{!user && (
						<>
							<Route path='/' element={<Login setUser={setUser} />} />
							<Route path='*' element={<Error404 />} />
						</>
					)}
					{user && (
						<>
							<Route path='/' element={<Dashboard user={user} setHangul={setHangul} hangul={hangul} setSessionData={setSessionData} />} />
							<Route path='dashboard' element={<Dashboard user={user} setHangul={setHangul} hangul={hangul} setSessionData={setSessionData} />} />
							<Route path='hangul' element={<Hangul hangul={hangul}/>} />
							<Route path='stats' element={<Stats hangul={hangul}/>} />
							{sessionData && <Route path='practice' element={<Practice sessionData={sessionData} user={user} />} />}
							<Route path='*' element={<Error404 />} />
						</>
					)}
				</Routes>
			</Container>
		</div>
	);
}

export default App;
