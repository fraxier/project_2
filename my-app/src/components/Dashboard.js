import { Box, Paper, Typography, Divider, Checkbox, FormControlLabel, FormLabel, RadioGroup, Radio, TextField, Slider, Button } from "@mui/material"
import { FormControl } from '@mui/material';
import React, { useState } from "react"

export default function Dashboard({ user }) {

    const [radioState, setRadioState] = useState('all')
    const [sliderValue, setSliderValue] = useState(20);
    const [max, setMax] = useState(40)

    const handleRadioChange = (event) => {
        const limitSlider = limit => {
            setSliderValue(sliderValue > limit ? limit : sliderValue);
        }
        switch (event.target.value) {
            case 'all':
                setMax(40)
                break;
            case 'onlyVowels':
                limitSlider(21);
                setMax(21)
                break;
            default:
                limitSlider(19)
                setMax(19);
        }

        setRadioState(event.target.value);
    }
    const handleSliderChange = (event) => {
        console.log(event)
        setSliderValue(event.target.value);
    }

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection:'column', mt: 10 }}>
                <Box sx={{ display: 'flex', flexDirection:'row', gap: 2}}>
                    <Paper elevation={2} sx={{ width: '45%', flexGrow: 1, px: 5, pt: 4, pb: 10 }}>
                        <Typography color={'primary'} variant='h4' sx={{ mb: 2 }}>
                            Welcome {user}!
                        </Typography>   
                        <Typography variant="body2">
                            Thank you for trying my flashcard learning app, ㅋuㅋu!<br/>
                            It's pronounced Fufu and it uses the hangul commonly used to denote 'lol' in Korean chat.<br/>
                            I thought it looked like a backwards 'F' so I decided to think of a fun words that starts with 'F', in the hopes of discovering a name for the app!<br/>
                            <Typography fontStyle={'italic'} sx={{ my: 1 }}>
                                Something short and sweet, like a laugh or chuckle...
                            </Typography>
                            That's when I vaguely remembered the existence of a Japanese onomatopoeia for chuckle, <Typography display={'inline'} fontWeight="bold" variant="body2">fufu! </Typography>
                            <Typography variant='subtitle2' color='primary'>Please go ahead and use the box to the right to get started with your practice!</Typography>
                        </Typography>
                    </Paper>
                    <Paper sx={{ flexGrow: 1, px: 5, py: 4 }}>
                        <Typography color='secondary' variant='h6'>
                            Practice!
                        </Typography>
                        <Divider sx={{ my: 1 }} />
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Options:</FormLabel>
                                <RadioGroup name='hangul-options' 
                                row
                                value={radioState}
                                defaultValue={radioState}
                                onChange={handleRadioChange}>
                                    <FormControlLabel 
                                        value="all"
                                        control={<Radio color="secondary" />}
                                        label="All"
                                        />
                                    <FormControlLabel 
                                        value="onlyConsonants"
                                        control={<Radio color="secondary" />}
                                        label="Consonants Only"
                                    />
                                    <FormControlLabel
                                        value="onlyVowels"
                                        control={<Radio color="secondary"/>}
                                        label="Vowels Only"
                                        />
                                </RadioGroup>
                                <Slider
                                    color="secondary"
                                    aria-label="Number of hangul to practice"
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
                                        }
                                    ]}
                                    step={1}
                                    min={1}
                                    max={max}
                                />
                                <Button color="secondary" variant='contained'>
                                    <Typography>
                                        Let's practice {sliderValue} hangul!
                                    </Typography>
                                </Button>
                        </FormControl>
                    </Paper>
                </Box>
            </Box>
        </>
    )
}