import React, { useState, useEffect } from 'react';
import _ from 'lodash'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, List, ListItem, ListItemIcon, ListItemText, Collapse, TextField, Icon, IconButton } from '@material-ui/core';
import { ExpandLess, ExpandMore} from '@material-ui/icons';
import clsx from 'clsx';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

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
  contenedorFormulario: {
    width: "100%",
    height: '100%',
    marginLeft: '18%',
    position: 'absolute',
    textAlign: 'center',
  },
  formulario: {
    marginTop: 60,
    marginLeft: '4%',
    //boxShadow: theme.shadows[6],
    width: "75%",
    height: '70%',
  },
  filtro: {
    paddingTop: 30,
    display: 'flex',
    height: '8%',
    marginLeft: 30
  },
  textField: {
    height: '50%'
  },
  boton: {
    borderRadius: 10,
    height: 30,
    width: 100,
    fontFamily: "Montserrat, sans-serif", 
  },
  contenedorTabla: {
    paddingTop: 100,
    paddingLeft: '15%',
    width: '70%',
  },
  tabla: {
    minWidth: 650,  
  },
  iconoAcciones: {
    width: '70%',
    height: '70%'
  },
  headerTabla: {
    backgroundColor: theme.palette.primary.main,
  },
  colorTextoPrimario: {
    color: theme.palette.primary.main,
  },
  colorTextoSecundario:{
    color: theme.palette.secondary.main,
  },
}));

const ReporteAsistencia = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [datos, setDatos] = useState([
    { dni: 999999999, nombres: 'Nombres', apellidos: 'Apellidos', fecha: '01/12/22', tipo: 'E'},
    { dni: 999999999, nombres: 'Nombres', apellidos: 'Apellidos', fecha: '01/12/22', tipo: 'E'},
    { dni: 999999999, nombres: 'Nombres', apellidos: 'Apellidos', fecha: '01/12/22', tipo: 'E'},
    { dni: 999999999, nombres: 'Nombres', apellidos: 'Apellidos', fecha: '01/12/22', tipo: 'E'},
  ]);
  const handleClick = () => {
    setOpen(!open);
  };

  const accionPdf = () => {
    alert('Algún día funcionará');
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
      <div className={clsx(classes.contenedorFormulario, classes.tipoletra2, classes.colorTextoPrimario)}>
        <form className={clsx(classes.formulario)}>
          <h2 style={{textTransform: 'uppercase',}}>reporte de asistencia</h2>
          <div style={{display: 'flex', paddingBottom: 20}}>
            <div className={clsx(classes.filtro)}>
              <p style={{textTransform: 'uppercase',}}>dni:</p>
              <FormControl style={{marginLeft: 37, justifyContent: 'center'}} variant="outlined">
                <OutlinedInput
                  className={clsx(classes.textField)}
                  id="outlined-adornment-usuario"
                  //value={values.usuario}
                  //onChange={handleChange('usuario')}
                  labelWidth={0}
                />
              </FormControl>
            </div>
            <div className={clsx(classes.filtro)}>
              <p>Nombre:</p>
              <FormControl style={{marginLeft: 37, justifyContent: 'center'}} variant="outlined">
                <OutlinedInput
                  className={clsx(classes.textField)}
                  id="outlined-adornment-usuario"
                  //value={values.usuario}
                  //onChange={handleChange('usuario')}
                  labelWidth={0}
                />
              </FormControl>
            </div>
            <div className={clsx(classes.filtro)}>
              <p>Apellido:</p>
              <FormControl style={{marginLeft: 37, justifyContent: 'center'}} variant="outlined">
                <OutlinedInput
                  className={clsx(classes.textField)}
                  id="outlined-adornment-usuario"
                  //value={values.usuario}
                  //onChange={handleChange('usuario')}
                  labelWidth={0}
                />
              </FormControl>
            </div>
            <div style={{display: 'flex', height: '8%', marginLeft: 30, paddingTop: 25}}>
              <p >Código modular:</p>
              <FormControl style={{marginLeft: 30, justifyContent: 'center'}} variant="outlined">
                <OutlinedInput
                  className={clsx(classes.textField)}
                  id="outlined-adornment-usuario"
                  //value={values.usuario}
                  //onChange={handleChange('usuario')}
                  labelWidth={0}
                />
              </FormControl>
            </div>
          </div>
          <Button
              style={{float: 'right'}}
              className={clsx(classes.boton, classes.tipoletra2)} 
              color='primary' 
              variant='contained'
              //onClick={() => onSubmit()}
              onClick = {accionPdf}
            >
              Buscar
          </Button>
          <div className={clsx(classes.contenedorTabla)}>
            <TableContainer component={Paper}>
              <Table className={classes.tabla} aria-label="simple table">
                <TableHead className={clsx(classes.headerTabla)}>
                  <TableRow>
                    <TableCell className={clsx(classes.colorTextoSecundario, classes.tipoletra2)} align="center">DNI</TableCell>
                    <TableCell className={clsx(classes.colorTextoSecundario, classes.tipoletra2)} align="center">Nombres</TableCell>
                    <TableCell className={clsx(classes.colorTextoSecundario, classes.tipoletra2)} align="center">Apellidos</TableCell>
                    <TableCell className={clsx(classes.colorTextoSecundario, classes.tipoletra2)} align="center">Fecha</TableCell>
                    <TableCell className={clsx(classes.colorTextoSecundario, classes.tipoletra2)} align="center">Tipo</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {datos.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className={clsx(classes.colorTextoPrimario, classes.tipoletra2)} align='center' component="th" scope="row">
                        {row.dni}
                      </TableCell>
                      <TableCell className={clsx(classes.colorTextoPrimario, classes.tipoletra2)} align="center">{row.nombres}</TableCell>
                      <TableCell className={clsx(classes.colorTextoPrimario, classes.tipoletra2)} align="center">{row.apellidos}</TableCell>
                      <TableCell className={clsx(classes.colorTextoPrimario, classes.tipoletra2)} align="center">{row.fecha}</TableCell>
                      <TableCell className={clsx(classes.colorTextoPrimario, classes.tipoletra2)} align="center">{row.tipo}</TableCell>              
                    </TableRow>
                  ))} 
                </TableBody>
              </Table>
            </TableContainer>
          </div> 
        </form>
      </div>
    </div> 
  );
}

export default ReporteAsistencia;