import React from 'react';
import _ from 'lodash'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, List, ListItem, ListItemIcon, ListItemText, Collapse } from '@material-ui/core';
import { ExpandLess, ExpandMore} from '@material-ui/icons';
import clsx from 'clsx';


const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    margin:0,
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
    margin:0, 
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
  colorSecundario:{
    color: theme.palette.primary.main,
  },
  contenedorFormulario: {
    width: "100%",
    height: '100%',
    marginLeft: '10%',
    position: 'absolute',
    textAlign: 'center',
    marginTop: 50,
  },
  formulario: {
    marginLeft: '15%',
    boxShadow: theme.shadows[6],
    width: "70%",
    height: '70%',
  }
}));

const RegistroPersonal = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className={clsx(classes.root)}>
      <div style={{height: '13%', margin: 0}}>
        <AppBar position="relative" className={classes.appBar}>
          <Toolbar>
            <div className={clsx(classes.contenedorLogo)}>
              <div style={{width:'7%', height:'100%'}}>
                <img className={clsx(classes.logo)} src = './images/Recurso1.png'/>
              </div>
              <div style={{justifyContent: 'center', marginLeft: 10, marginTop:3}}>
                <h3 className={clsx(classes.titulo)} style={{fontSize:15}}>escuela superior de arte dramático de trujillo</h3>
                <h2 className={clsx(classes.titulo)} style={{fontSize:29,}}>virgilio rodriguez nache</h2>
                <p className={clsx(classes.titulo)} style={{textTransform: 'none', fontSize:10}}>Autorizado por D.S N 055-1985-ED / Resolución N1 0360-2011-ANR</p>
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </div>
      <div className={clsx(classes.contenedorMenu)}>
        <List component="nav" className={classes.drawer} aria-label="menu">
          <ListItem style={{padding: 20}} button onClick={handleClick}>
            <ListItemIcon>
              <img style={{marginLeft:10, width: '56%',height: '56%'}} src = './images/Recurso4.png'/>
            </ListItemIcon>
            <ListItemText disableTypography primary="Gestión de Personal" className={clsx(classes.tipoletra2)}/>
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component='div' disablePadding>
              <ListItem button style={{marginLeft: 20}}>
                <ListItemIcon>
                  <img style={{marginLeft: 40}} src = './images/Recurso7.png'/>
                </ListItemIcon>
                <ListItemText disableTypography className={clsx(classes.tipoletra1)} primary='Registro de Personal'/>
              </ListItem>
              <ListItem button style={{marginLeft: 20}}>
                <ListItemIcon>
                  <img style={{marginLeft: 40}} src = './images/Recurso7.png'/>
                </ListItemIcon>
                <ListItemText disableTypography component='div' className={clsx(classes.tipoletra1)} primary='Mantenimiento de personal'/>
              </ListItem>
            </List>
          </Collapse>
          <ListItem style={{padding: 20}} button>
            <ListItemIcon>
              <img className={clsx(classes.iconoPrincipal)} src = './images/Recurso5.png'/>
            </ListItemIcon>
            <ListItemText disableTypography className={clsx(classes.tipoletra2)} primary="Reporte de Planillas" />
          </ListItem>
          <ListItem style={{padding: 20}} button>
            <ListItemIcon>
              <img className={clsx(classes.iconoPrincipal)} src = './images/Recurso6.png'/>
            </ListItemIcon>
            <ListItemText disableTypography className={clsx(classes.tipoletra2)} primary="Reporte de Asistencia" />
          </ListItem>
        </List>
      </div>
      <div className={clsx(classes.contenedorFormulario)}>
        <form className={clsx(classes.formulario)}>
          <h2 style={{}}>Registro de nuevo person</h2>
        </form>
      </div>
    </div> 
  );
}

export default RegistroPersonal;