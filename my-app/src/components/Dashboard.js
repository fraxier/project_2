import { Box, Paper, Typography, Divider, Checkbox, FormControlLabel, FormLabel, RadioGroup, Radio, TextField, Slider, Button, Alert, AlertTitle } from '@mui/material';
import { FormControl } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const jsonURL = 'http://localhost:3001';

export default function Dashboard({ user, setSessionData, setHangul, hangul, practiced }) {
	const [radioState, setRadioState] = useState('all');
	const [sliderValue, setSliderValue] = useState(20);
	const [max, setMax] = useState(40);
	const [params, setParams] = useSearchParams();
	const navigate = useNavigate();

	useEffect(()=> {
	  fetch('https://api.jsonbin.io/v3/b/630c3059e13e6063dc9067d2?meta=false', {
	    method: 'GET',
	    headers: {
	      'X-MASTER-KEY': '$2b$10$Rjvmn7PaK51qkUKCqg1l5uYHjdC4Wo.Sft4njUYdx.KAX9HClFVnO'
	    }
	  }).then(response => {
	    const res = response.json();
	    console.log(res);
	    return res;
	  }).then(obj => {
	    console.log(obj)
	    setHangul(obj.hangul);
	  })
	}, [])

	// useEffect(() => {
	// 	if (!!hangul) return;
	// 	console.log('fetching hangul!');

	// 	fetch(`${jsonURL}/hangul`)
	// 		.then((response) => {
	// 			return response.json();
	// 		})
	// 		.then((obj) => {
	// 			setHangul(obj);
	// 		});
	// }, []);

	const handleRadioChange = (event) => {
		const limitSlider = (limit) => {
			console.log(limit);
			setSliderValue(sliderValue > limit ? limit : sliderValue);
		};
		switch (event.target.value) {
			case 'all':
				setMax(40);
				break;
			case 'vowelsOnly':
				limitSlider(21);
				setMax(21);
				break;
			default:
				limitSlider(19);
				setMax(19);
		}

		setRadioState(event.target.value);
	};
	const handleSliderChange = (event) => {
		setSliderValue(event.target.value);
	};
	const handleButtonClick = (event) => {
		const list = selectHangul(hangul, radioState, sliderValue);
		setSessionData(list);
		navigate('/practice');
	};

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', mt: 10 }}>
			{params.get('practiced') === '1' && (
				<Alert sx={{ mb: 2 }} severity='success'>
					<AlertTitle><Typography variant='h6'>Nice practice👍!</Typography></AlertTitle>
          You just finished a practice session! Did you feel the burn?
				</Alert>
			)}
			<Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
				<Paper elevation={2} sx={{ width: '45%', flexGrow: 1, px: 5, pt: 4, pb: 10 }}>
					<Typography color={'primary'} variant='h4' sx={{ mb: 2 }}>
						Welcome {user.username}!
					</Typography>
					<Typography variant='body1' lineHeight={2}>
						Thank you for trying my flashcard learning app, ㅋuㅋu!
						<br />
						It's pronounced Fufu and it uses the hangul used to write 'lol' in Korean.
						<br />
						I thought it looked like a backwards 'F' so I decided to think of fun words that start with 'F', in the hopes of discovering a name for the app!
						<br />
						<Typography fontStyle={'italic'} component='b' sx={{ my: 1 }}>
							Something short and sweet, like a laugh or chuckle...
						</Typography>
						That's when I vaguely remembered the existence of a Japanese onomatopoeia for chuckle,{' '}
						<Typography display={'inline'} component='b' fontWeight='bold' variant='body2'>
							fufu!{' '}
						</Typography>
						<Typography component='b' variant='subtitle1' color='primary' sx={{ display: 'block', mt: 2 }}>
							Please go ahead and use the box to the right to get started with your practice!
						</Typography>
					</Typography>
          <Typography variant='body2'>
            Korean is written using consonants and vowels, depending on whether the consonant is the start of a word or syllable it may have a different pronounciation or sound.
            Similarly the pronounciation may be different if the consonant is at the end of a word or syllable.
            Nouns have only one pronounciation.
          </Typography>
				</Paper>
				<Paper sx={{ flexGrow: 1, px: 5, py: 4 }}>
					<Typography color='secondary' variant='h6'>
						Practice!
					</Typography>
					<Divider sx={{ my: 1 }} />
					<FormControl component='fieldset'>
						<FormLabel component='legend'>Options:</FormLabel>
						<RadioGroup name='hangul-options' row value={radioState} defaultValue={radioState} onChange={handleRadioChange}>
							<FormControlLabel value='all' control={<Radio color='secondary' />} label='All' />
							<FormControlLabel value='consonantsOnly' control={<Radio color='secondary' />} label='Consonants Only' />
							<FormControlLabel value='vowelsOnly' control={<Radio color='secondary' />} label='Vowels Only' />
						</RadioGroup>
						<Slider
							color='secondary'
							aria-label='Number of hangul to practice'
							defaultValue={sliderValue}
							value={sliderValue}
							sx={{ mt: 2, mb: 6 }}
							onChange={handleSliderChange}
							marks={[
								{
									value: 1,
									label: '1',
								},
								{
									value: max,
									label: max,
								},
							]}
							step={1}
							min={1}
							max={max}
						/>
						<Button color='secondary' variant='contained' onClick={handleButtonClick}>
							<Typography>Let's practice {sliderValue} hangul!</Typography>
						</Button>
					</FormControl>
				</Paper>
			</Box>
		</Box>
	);
}

function selectHangul(hangul, filter, num) {
	let list;

	switch (filter) {
		case 'all':
			list = hangul;
			break;
		case 'vowelsOnly':
			list = hangul.filter((item) => item.isVowel);
			break;
		case 'consonantsOnly':
			list = hangul.filter((item) => !item.isVowel);
			break;
	}

	list = list.sort(() => 0.5 - Math.random());
	return list.slice(0, num);
}
