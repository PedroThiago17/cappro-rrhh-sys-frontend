import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import clsx from 'clsx';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  contenedorPrincipal: {
    justifyContent: "center",
    height: "100vh",
  },
  contenedorHeader: {
    backgroundColor: theme.palette.primary.main,
    height:'18%'
  },
  header: {
    display: 'flex',
    paddingTop: 42,
  },
  logo: {
    width: '6%',
    height: '6%', 
  },
  titulo: {
    margin:0, 
    textTransform: 'uppercase',
    color: theme.palette.secondary.main,
    fontWeight: 500
  }
}));

function VerticalNavbar() {
  const classes = useStyles();

  return (
    <div className={clsx(classes.contenedorPrincipal)}>
        <div className={clsx(classes.contenedorHeader)}>
          <div className={clsx(classes.header)}>
            <img className={clsx(classes.logo)} src = './images/Recurso1.png'/>
            <div style={{justifyContent: 'center', marginLeft: 10}}>
              <h3 className={clsx(classes.titulo)}>escuela superior de arte dramático de trujillo</h3>
              <h2 className={clsx(classes.titulo)} style={{fontSize:36,}}>virgilio rodriguez nache</h2>
              <p style={{margin: 0, fontSize: 14}} color='primary'>Autorizado por D.S N 055-1985-ED / Resolución N1 0360-2011-ANR</p>
            </div>
          </div>
        </div>
        
    </div>
    
  );
}

export default VerticalNavbar;