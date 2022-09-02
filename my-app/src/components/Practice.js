import {
  LinearProgress,
  Paper,
  Typography,
  Button,
  Container,
  Box,
  ToggleButtonGroup,
  ToggleButton,
  Chip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ColorToggleButton from "./ColorToggleButton";

export default function Practice({ sessionData, user }) {
  const [performance, setPerformance] = useState([]);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState();
  const curHangul = sessionData[index];
  

  const getChoices = (answer, i) => {
    console.log('getting choices for ' + i)
    const choices = [answer];
    const candidates = [...sessionData]
      .sort(() => 0.5 - Math.random())
      .slice(0, 2);

    candidates.forEach((item) => {
      choices.push(item.pronounciation[i]);
    });
    return choices;
  };

  const question = {
    hangul: curHangul,
    startChoices: !curHangul.isVowel && getChoices(curHangul.pronounciation[0], 0),
    startAnswer: !curHangul.isVowel && curHangul.pronounciation[0],

    syllableChoices: !curHangul.isVowel && getChoices(curHangul.pronounciation[1], 1),
    syllableAnswer: !curHangul.isVowel && curHangul.pronounciation[1],

    endChoices: !curHangul.isVowel && getChoices(curHangul.pronounciation[2], 2),
    endAnswer: !curHangul.isVowel && curHangul.pronounciation[2],

    vowelChoices: curHangul.isVowel && getChoices(curHangul.pronounciation[0], 0),
    vowelAnswer: curHangul.isVowel && curHangul.pronounciation[0],
  }



  console.log(question);

  return (
    <Paper elevation={5} sx={{ py: 7, px: 7, height: "70vh" }}>
      <Container>
        <LinearProgress
          sx={{ borderRadius: 2, height: 7, mb: 4 }}
          variant="buffer"
          value={0}
          valueBuffer={5}
          color="secondary"
        />
        <Paper elevation={3} sx={{ p: 5, textAlign: "center" }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {question.hangul.isVowel && 
              <>
                
              </>
            }
            {!question.hangul.isVowel && 
              <>
                <Typography variant="h3">{question.hangul.hangul}</Typography>
                <Typography variant="h5">{question.hangul.name_kr} - ({question.hangul.name})</Typography>
                <Chip label='Consonant' />
                <ColorToggleButton setAnswer={setAnswer}/>
              </>
            }
          </Box>
        </Paper>
        <Box sx={{ display: "flex" }}>
          <Button variant="contained" color="warning">
            Save & Quit
          </Button>
        </Box>
      </Container>
    </Paper>
  );
}
