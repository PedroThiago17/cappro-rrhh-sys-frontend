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
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MenuPrincipal from './components/MenuPrincipal/MenuPrincipal';

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

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/menu',
    element: <MenuPrincipal />,
  },
  {
    path: '/registropersonal',
    element: <RegistroPersonal />,
  },
  {
    path: '/mantenimientopersonal',
    element: <MantenimientoDePersonal />,
  },
  {
    path: '/reporteplanilla',
    element: <ReportePlanillas />,
  },
  {
    path: '/reporteasistencia',
    element: <ReporteAsistencia />,
  }
])

root.render(
  <ThemeProvider theme={theme}>
    <Login></Login>
    
    
    {/* <RegistroPersonal/>
    <MantenimientoDePersonal/>
    <ReporteAsistencia></ReporteAsistencia>
    <MantenimientoDePersonal/>
    <ReportePlanillas></ReportePlanillas>
     */}
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
