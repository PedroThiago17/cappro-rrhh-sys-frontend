import React, { useEffect } from 'react';
import _ from 'lodash'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, List, ListItem, ListItemIcon, ListItemText, Collapse, IconButton } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import clsx from 'clsx';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import MantenimientoDePersonal from '../MantenimientoDePersonal/MantenimientoDePersonal';
import RegistroPersonal from '../RegistroDePersonal/RegistroPersonal';
import ReportePlanillas from '../ReportePlanillas/ReportePlanillas';
import ReporteAsistencia from '../ReporteAsistencia/ReporteAsistencia';
import './styles/menu.css'
import Navbar from '../Navbar/Navbar';
import Modulos from './Modulos';
import { useMediaQuery } from 'react-responsive'
import ModulosResponsive from './ModulosResponsive';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    margin: 0,
    fontFamily: "Montserrat, sans-serif"
  },
  contenedorLogo: {
    display: 'flex',
    paddingTop: 26,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  titulo: {
    margin: 0,
    textTransform: 'uppercase',
    color: theme.palette.secondary.main,
    fontWeight: 500
  },
  appBar: {
    height: '100%',
  },
  drawer: {
    marginTop: 50,
    color: theme.palette.primary.main,
  },
  contenedorMenu: {
    position: 'absolute',
    width: '18%',
    height: '87%',
    boxShadow: theme.shadows[6],
  },
  letraMenu: {
    fontWeight: 700,
    color: theme.palette.primary.main,
  },
  iconoPrincipal: {
    width: '40%',
    height: '40%',
    marginLeft: 15
  },
  tipoletra1: {
    fontWeight: 500
  },
  tipoletra2: {
    fontWeight: 700
  },
  color1Primario: {
    color: theme.palette.primary.main,
  },
  colorSecundario: {
    color: theme.palette.primary.main,
  },
}));

const MenuPrincipal = () => {

  const isTablet = useMediaQuery({ query: '(max-width: 768px)' })

  return (
    <main className='app-layout'>
      <Navbar></Navbar>
      <div className='main-container'>
        {
          isTablet ? <ModulosResponsive /> : <Modulos />
        }
        <div className='content'>
          <Outlet/>
        </div>
      </div>
    </main>
  );
}

export default MenuPrincipal;