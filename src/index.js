import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { BrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import LocalRoutes from './Router/LocalRoutes'

const root = ReactDOM.createRoot(document.getElementById('root'));
const theme = createTheme({
  palette: {
    primary: {
      main: '#0066CC'
    },
    secondary: {
      main:"#FFFFFF"
    },
  }
})

root.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <LocalRoutes/>
    </BrowserRouter>
  </ThemeProvider>
);
