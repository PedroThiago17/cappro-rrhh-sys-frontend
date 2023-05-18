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

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Login />,
//   },
//   {
//     path: '/menu',
//     element: <MenuPrincipal />,
//   },
//   {
//     path: '/registropersonal',
//     element: <RegistroPersonal />,
//   },
//   {
//     path: '/mantenimientopersonal',
//     element: <MantenimientoDePersonal />,
//   },
//   {
//     path: '/reporteplanilla',
//     element: <ReportePlanillas />,
//   },
//   {
//     path: '/reporteasistencia',
//     element: <ReporteAsistencia />,
//   }
// ])

root.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <LocalRoutes/>
    </BrowserRouter>
    

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
