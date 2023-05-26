import React from 'react';
import _ from 'lodash'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, List, ListItem, ListItemIcon, ListItemText, Collapse, IconButton } from '@material-ui/core';
import { ExpandLess, ExpandMore} from '@material-ui/icons';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import MantenimientoDePersonal from '../MantenimientoDePersonal/MantenimientoDePersonal';
import RegistroPersonal from '../RegistroDePersonal/RegistroPersonal';
import ReportePlanillas from '../ReportePlanillas/ReportePlanillas';
import ReporteAsistencia from '../ReporteAsistencia/ReporteAsistencia';
import NavBar from './NavBar';



const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    margin:0,
    fontFamily: "Montserrat, sans-serif"
  },
}));

const MenuPrincipal = () => {
  const classes = useStyles();
  return (
    <div className={clsx(classes.root)}>
      <NavBar/>
    </div> 
  );
}

export default MenuPrincipal;