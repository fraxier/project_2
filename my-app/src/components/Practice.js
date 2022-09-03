import { LinearProgress, Paper, Typography, Button, Container, Box, ToggleButtonGroup, ToggleButton, Chip, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ColorToggleButton from './ColorToggleButton';
import LinearWithValueLabel from './LinearProgressWithLabel';

export default function Practice({ hangul, sessionData, user }) {
	function getChoices(answer, i, isVowel) {
		const choices = [answer];
		const candidates = isVowel ? hangul.filter((item) => item.isVowel) : hangul.filter((item) => !item.isVowel);

		const chosenOnes = candidates.sort(() => 0.5 - Math.random()).slice(0, 2);

		chosenOnes.forEach((item) => {
			choices.push(item.pronounciation[i]);
		});
		return choices.sort(() => 0.5 - Math.random());
	}
	function getNextQuestion(curIndex) {
		const index = ++curIndex;

		if (index >= sessionData.length) {
			// handle session complete screen!
			console.log('Practice is finished and your stats have been updated!');
		}

		const curHangul = sessionData[index];
		return {
			index: index,
			hangul: curHangul,
			startChoices: !curHangul.isVowel && getChoices(curHangul.pronounciation[0], 0, false),
			startAnswer: !curHangul.isVowel && curHangul.pronounciation[0],

			syllableChoices: !curHangul.isVowel && getChoices(curHangul.pronounciation[1], 1, false),
			syllableAnswer: !curHangul.isVowel && curHangul.pronounciation[1],

			endChoices: !curHangul.isVowel && getChoices(curHangul.pronounciation[2], 2, false),
			endAnswer: !curHangul.isVowel && curHangul.pronounciation[2],

			vowelChoices: curHangul.isVowel && getChoices(curHangul.pronounciation[0], 0, true),
			vowelAnswer: curHangul.isVowel && curHangul.pronounciation[0],
		};
	}

	const [performance, setPerformance] = useState([]);
	const [question, setQuestion] = useState(getNextQuestion(-1));

	const [startAnswer, setStartAnswer] = useState('');
	const [syllableAnswer, setSyllableAnswer] = useState('');
	const [endAnswer, setEndAnswer] = useState('');
	const [vowelAnswer, setVowelAnswer] = useState('');

	const [progress, setProgress] = useState(0);

	const part = (1 / sessionData.length) * 100;

  console.log(progress, ' - ' , part)

	const submitHandler = (event) => {
		if (question.hangul.isVowel) {
			if (vowelAnswer === '') {
				throw new Error('Please choose your answer!');
			}
		} else {
			if (startAnswer === '' || syllableAnswer === '' || endAnswer === '') {
				throw new Error('Please choose an answer for all sounds!');
			}
		}

		const record = {};
		if (question.hangul.isVowel) {
			record.correct = vowelAnswer === question.vowelAnswer ? 1 : 0;
			record.hangul = question.hangul.id;
			setVowelAnswer(''); // reset answer
		} else {
			// first check if score is 100% otherwise if one correct indicate half mark otherwise none correct is 0
			record.correct =
				startAnswer === question.startAnswer && syllableAnswer === question.syllableAnswer && endAnswer === question.endAnswer
					? 1
					: startAnswer === question.startAnswer || syllableAnswer === question.syllableAnswer || endAnswer === question.endAnswer
					? 0.5
					: 0;
			record.hangul = question.hangul.id;
			setStartAnswer(''); // reset answers
			setSyllableAnswer('');
			setEndAnswer('');
		}
    setProgress(progress + part)
		setPerformance([...performance, record]);
		setQuestion(getNextQuestion(question.index));
	};

	return (
		<Paper elevation={5} sx={{ py: 7, px: 7, height: 600 }}>
			<Container>
				{/* <LinearProgress sx={{ borderRadius: 2, height: 7, mb: 4 }} variant='buffer' value={progress} valueBuffer={progress + part} color='secondary' /> */}
        <LinearWithValueLabel value={progress} valueBuffer={progress + part} color='secondary' sx={{ borderRadius: 2, height: 7 }} mb={4} />
				<Paper elevation={3} sx={{ px: 8, py: 7, textAlign: 'center' }}>
					<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
						{question.hangul.isVowel && (
							<>
								<Typography variant='h3'>{question.hangul.hangul}</Typography>
								<Chip color='secondary' label='Vowel' sx={{ my: 5 }} />
								<Tooltip arrow placement='top' title='Vowel sound'>
									<Box sx={{ display: 'flex', flexDirection: 'column' }}>
										<Typography variant='h6'>Sound</Typography>
										<ColorToggleButton setAnswer={setVowelAnswer} index={0} choices={question.vowelChoices} value={vowelAnswer} />
									</Box>
								</Tooltip>
							</>
						)}
						{!question.hangul.isVowel && (
							<>
								<Typography variant='h3'>{question.hangul.hangul}</Typography>
								<Typography variant='h5'>
									{question.hangul.name_kr} - ({question.hangul.name})
								</Typography>
								<Chip color='secondary' label='Consonant' sx={{ my: 5 }} />
								<Box sx={{ display: 'flex', flexDirection: 'row' }}>
									<Tooltip arrow placement='top' title='Sound at start of word'>
										<Box sx={{ display: 'flex', flexDirection: 'column' }}>
											<Typography variant='h6'>Start</Typography>
											<ColorToggleButton setAnswer={setStartAnswer} choices={question.startChoices} value={startAnswer} />
										</Box>
									</Tooltip>
									<Tooltip arrow placement='top' title='Sound at start of syllable'>
										<Box sx={{ display: 'flex', flexDirection: 'column' }}>
											<Typography variant='h6'>Syllable</Typography>
											<ColorToggleButton setAnswer={setSyllableAnswer} mx={3} choices={question.syllableChoices} value={syllableAnswer} />
										</Box>
									</Tooltip>
									<Tooltip arrow placement='top' title='Sound at end of word'>
										<Box sx={{ display: 'flex', flexDirection: 'column' }}>
											<Typography variant='h6'>End</Typography>
											<ColorToggleButton setAnswer={setEndAnswer} choices={question.endChoices} value={endAnswer} />
										</Box>
									</Tooltip>
								</Box>
							</>
						)}
						<Box sx={{ display: 'flex', mt: 5 }}>
							<Button size='large' sx={{ p: 3 }} variant='contained' onClick={submitHandler}>
								{question.index + 1 >= sessionData.length && 'Finish!'}
								{question.index + 1 < sessionData.length && 'Next!'}
							</Button>
						</Box>
					</Box>
				</Paper>
				<Box sx={{ display: 'flex', my: 3 }}>
					<Button size='medium' variant='contained' color='info'>
						Save & Quit
					</Button>
				</Box>
			</Container>
		</Paper>
	);
}
