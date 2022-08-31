import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from '@mui/material';
import { blue, blueGrey, brown, deepOrange, green, grey, purple, yellow } from '@mui/material/colors';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500]
    },
    secondary: {
      main: blue[800]
    }
  },
  typography: {
    body2: {
      letterSpacing: '0.025em'
    }
  }
})

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
