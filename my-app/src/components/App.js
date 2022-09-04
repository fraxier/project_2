import { Container } from '@mui/system';
import React, { useState } from 'react';
import { Route, Routes } from 'react-router';
import Dashboard from './Dashboard';
import Error404 from './Error404';
import Hangul from './Hangul';
import Login from './Login';
import Navbar from './Navbar';
import Practice from './Practice';
import History from './History';
import Session from './Session';

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
      "g (gone)",
      "g (gone)",
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

const full = [
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
          "g (gone)",
          "g (gone)",
          "g (gone)"
      ],
      "isVowel": false
  },
  {
      "id": 3,
      "name": "nieun",
      "name_kr": "니은",
      "hangul": "ㄴ",
      "pronounciation": [
          "n (now)",
          "n (now)",
          "n (now)"
      ],
      "isVowel": false
  },
  {
      "id": 4,
      "name": "digeut",
      "name_kr": "디귿",
      "hangul": "ㄷ",
      "pronounciation": [
          "t (talk)",
          "d (mind)",
          "t (hot)"
      ],
      "isVowel": false
  },
  {
      "id": 5,
      "name": "ssang digeut",
      "name_kr": "쌍디귿",
      "hangul": "ㄸ",
      "pronounciation": [
          "d (dog)",
          "d (dog)",
          "d (dog)"
      ],
      "isVowel": false
  },
  {
      "id": 6,
      "name": "rieul",
      "name_kr": "리을",
      "hangul": "ㄹ",
      "pronounciation": [
          "r (run)",
          "r (run)",
          "l (real)"
      ],
      "isVowel": false
  },
  {
      "id": 7,
      "name": "mieum",
      "name_kr": "미음",
      "hangul": "ㅁ",
      "pronounciation": [
          "m (mop)",
          "m (mop)",
          "m (hum)"
      ],
      "isVowel": false
  },
  {
      "id": 8,
      "name": "bieup",
      "name_kr": "비읍",
      "hangul": "ㅂ",
      "pronounciation": [
          "p (pool)",
          "b (bay)",
          "p (lap)"
      ],
      "isVowel": false
  },
  {
      "id": 9,
      "name": "ssang bieup",
      "name_kr": "쌍비읍",
      "hangul": "ㅃ",
      "pronounciation": [
          "b (bird)",
          "b (bird)",
          "b (bird)"
      ],
      "isVowel": false
  },
  {
      "id": 10,
      "name": "siot",
      "name_kr": "시옷",
      "hangul": "ㅅ",
      "pronounciation": [
          "s (show)",
          "s (show)",
          "t (hot)"
      ],
      "isVowel": false
  },
  {
      "id": 11,
      "name": "ssang siot",
      "name_kr": "쌍시옷",
      "hangul": "ㅆ",
      "pronounciation": [
          "s (sun)",
          "s (sun)",
          "t (hot)"
      ],
      "isVowel": false
  },
  {
      "id": 12,
      "name": "ieung",
      "name_kr": "이응",
      "hangul": "ㅇ",
      "pronounciation": [
          "silent",
          "silent",
          "ng (ring)"
      ],
      "isVowel": false
  },
  {
      "id": 13,
      "name": "jieut",
      "name_kr": "지읒",
      "hangul": "ㅈ",
      "pronounciation": [
          "ch (chop)",
          "j (jar)",
          "t (hot)"
      ],
      "isVowel": false
  },
  {
      "id": 14,
      "name": "ssang jieut",
      "name_kr": "쌍지읒",
      "hangul": "ㅉ",
      "pronounciation": [
          "j (jim)",
          "j (jim)",
          "t (hot)"
      ],
      "isVowel": false
  },
  {
      "id": 15,
      "name": "chieut",
      "name_kr": "치읓",
      "hangul": "ㅊ",
      "pronounciation": [
          "ch (itch)",
          "ch (itch)",
          "t (hot)"
      ],
      "isVowel": false
  },
  {
      "id": 16,
      "name": "kieuk",
      "name_kr": "키읔",
      "hangul": "ㅋ",
      "pronounciation": [
          "kh (khaki)",
          "kh (khaki)",
          "kh (khaki)"
      ],
      "isVowel": false
  },
  {
      "id": 17,
      "name": "tieut",
      "name_kr": "티읕",
      "hangul": "ㅌ",
      "pronounciation": [
          "t (tip)",
          "t (tip)",
          "t (hot)"
      ],
      "isVowel": false
  },
  {
      "id": 18,
      "name": "pieup",
      "name_kr": "피읖",
      "hangul": "ㅍ",
      "pronounciation": [
          "p (pit)",
          "p (pit)",
          "p (lap)"
      ],
      "isVowel": false
  },
  {
      "id": 19,
      "name": "hieut",
      "name_kr": "히읕",
      "hangul": "ㅎ",
      "pronounciation": [
          "h (hot)",
          "h (hot)",
          "silent"
      ],
      "isVowel": false
  },
  {
      "id": 20,
      "name": "ah",
      "hangul": "ㅏ",
      "pronounciation": [
          "ah (rah)"
      ],
      "isVowel": true
  },
  {
      "id": 21,
      "name": "uh",
      "hangul": "ㅓ",
      "pronounciation": [
          "uh (run)"
      ],
      "isVowel": true
  },
  {
      "id": 22,
      "name": "oh",
      "hangul": "ㅗ",
      "pronounciation": [
          "oh (dough)"
      ],
      "isVowel": true
  },
  {
      "id": 23,
      "name": "oo",
      "hangul": "ㅜ",
      "pronounciation": [
          "oo (moon)"
      ],
      "isVowel": true
  },
  {
      "id": 24,
      "name": "uh",
      "hangul": "ㅡ",
      "pronounciation": [
          "uh (brook)"
      ],
      "isVowel": true
  },
  {
      "id": 25,
      "name": "ee",
      "hangul": "ㅣ",
      "pronounciation": [
          "ee (meek)"
      ],
      "isVowel": true
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
  {
      "id": 28,
      "name": "yah",
      "hangul": "ㅑ",
      "pronounciation": [
          "yah (yawn)"
      ],
      "isVowel": true
  },
  {
      "id": 29,
      "name": "yuh",
      "hangul": "ㅕ",
      "pronounciation": [
          "yuh (yum)"
      ],
      "isVowel": true
  },
  {
      "id": 30,
      "name": "yoh",
      "hangul": "ㅛ",
      "pronounciation": [
          "yoh (yodel)"
      ],
      "isVowel": true
  },
  {
      "id": 31,
      "name": "yoo",
      "hangul": "ㅠ",
      "pronounciation": [
          "yoo (view)"
      ],
      "isVowel": true
  },
  {
      "id": 32,
      "name": "yae",
      "hangul": "ㅒ",
      "pronounciation": [
          "yae (yak)"
      ],
      "isVowel": true
  },
  {
      "id": 33,
      "name": "yeh",
      "hangul": "ㅖ",
      "pronounciation": [
          "yeh (yes)"
      ],
      "isVowel": true
  },
  {
      "id": 34,
      "name": "wah",
      "hangul": "ㅘ",
      "pronounciation": [
          "wah (wand)"
      ],
      "isVowel": true
  },
  {
      "id": 35,
      "name": "wae",
      "hangul": "ㅙ",
      "pronounciation": [
          "wae (wax)"
      ],
      "isVowel": true
  },
  {
      "id": 36,
      "name": "wuh",
      "hangul": "ㅝ",
      "pronounciation": [
          "wuh (wonder)"
      ],
      "isVowel": true
  },
  {
      "id": 37,
      "name": "weh",
      "hangul": "ㅞ",
      "pronounciation": [
          "weh (web)"
      ],
      "isVowel": true
  },
  {
      "id": 38,
      "name": "weh",
      "hangul": "ㅚ",
      "pronounciation": [
          "weh (wait)"
      ],
      "isVowel": true
  },
  {
      "id": 39,
      "name": "wee",
      "hangul": "ㅟ",
      "pronounciation": [
          "wee (week)"
      ],
      "isVowel": true
  },
  {
      "id": 40,
      "name": "uey",
      "hangul": "ㅢ",
      "pronounciation": [
          "uey (muey)"
      ],
      "isVowel": true
  }
]


function App() {
	const [user, setUser] = useState();
  const [hangul, setHangul] = useState()
	const [sessionData, setSessionData] = useState();

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
							<Route path='/dashboard' element={<Dashboard user={user} setHangul={setHangul} hangul={hangul} setSessionData={setSessionData} />} />
							<Route path='/hangul' element={<Hangul hangul={hangul} user={user} />} />
							<Route path='/history' element={<History hangul={hangul} user={user} />} />
              <Route path='/history/:id' element={<Session hangul={hangul} user={user}/>} />
							{sessionData && <Route path='practice' element={<Practice hangul={hangul} sessionData={sessionData} user={user} />} />}
							<Route path='*' element={<Error404 />} />
						</>
					)}
				</Routes>
			</Container>
		</div>
	);
}

export default App;
