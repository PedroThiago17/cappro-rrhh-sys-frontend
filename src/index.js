import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Login from './components/Login';
import RegistroPersonal from './components/RegistroDePersonal/RegistroPersonal';
import ReportePlanillas from './components/ReportePlanillas/ReportePlanillas';
import ReporteAsistencia from './components/ReporteAsistencia/ReporteAsistencia';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import MantenimientoDePersonal from './components/MantenimientoDePersonal/MantenimientoDePersonal';

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
    <Login></Login>
    {/* <RegistroPersonal/>
    <MantenimientoDePersonal/>
    <ReportePlanillas></ReportePlanillas>
    <ReporteAsistencia></ReporteAsistencia> */}
  </ThemeProvider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
