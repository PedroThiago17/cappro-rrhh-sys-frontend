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
import { useNavigate } from 'react-router-dom';
import NavBar from '../MenuPrincipal/NavBar';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "98vh",
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
    width: "150vh",
    height: '80%',
    marginLeft: '18%',
    position: 'absolute',
    textAlign: 'center',
  },
  formulario: {
    marginTop: 50,
    marginLeft: '4%',
    boxShadow: theme.shadows[6],
    width: "152vh",
    height: '95%',
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
    paddingTop: 80,
    paddingLeft: 15,
    width: '99%',
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

const ReportePlanillas = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [datos, setDatos] = useState([
    { mes: 'Diciembre', year: 2022, dni: 999999999, nombres: 'Cristian Omar', apellidos: 'Suclupe Llontop'},
    { mes: 'Diciembre', year: 2022, dni: 999999999, nombres: 'Cristian Omar', apellidos: 'Suclupe Llontop'},
    { mes: 'Diciembre', year: 2022, dni: 999999999, nombres: 'Cristian Omar', apellidos: 'Suclupe Llontop'},
    { mes: 'Diciembre', year: 2022, dni: 999999999, nombres: 'Cristian Omar', apellidos: 'Suclupe Llontop'},
  ]);
  const handleClick = () => {
    setOpen(!open);
  };

  const accionPdf = () => {
    alert('Algún día funcionará');
  };
  const navigate = useNavigate();
  const onSubmit = (url) => {
    navigate(url);
    console.log(url);
  }

  return (
    <div className={clsx(classes.root)}>
      <NavBar />
      <div className={clsx(classes.contenedorFormulario, classes.tipoletra2, classes.colorTextoPrimario)}>
        <form className={clsx(classes.formulario)}>
          <h2 style={{textTransform: 'uppercase', paddingTop: 40}}>consulta y reporte de planillas</h2>
          <div style={{display: 'flex', paddingBottom: 20, justifyContent: 'space-evenly', width: '90%'}}>
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
            <div style={{paddingTop:45}} className={clsx(classes.filtro)}>
              <Button
                className={clsx(classes.boton, classes.tipoletra2)} 
                color='primary' 
                variant='contained'
                //onClick={() => onSubmit()}
                onClick = {accionPdf}
              >
                Buscar
              </Button>
            </div>
          </div>
          <div className={clsx(classes.contenedorTabla)}>
            <TableContainer component={Paper}>
              <Table className={classes.tabla} aria-label="simple table">
                <TableHead className={clsx(classes.headerTabla)}>
                  <TableRow>
                    <TableCell className={clsx(classes.colorTextoSecundario, classes.tipoletra2)} align="center">Mes</TableCell>
                    <TableCell className={clsx(classes.colorTextoSecundario, classes.tipoletra2)} align="center">Año</TableCell>
                    <TableCell className={clsx(classes.colorTextoSecundario, classes.tipoletra2)} align="center">DNI</TableCell>
                    <TableCell className={clsx(classes.colorTextoSecundario, classes.tipoletra2)} align="center">Nombres</TableCell>
                    <TableCell className={clsx(classes.colorTextoSecundario, classes.tipoletra2)} align="center">Apellidos</TableCell>
                    <TableCell className={clsx(classes.colorTextoSecundario, classes.tipoletra2)} align="center">Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {datos.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className={clsx(classes.colorTextoPrimario, classes.tipoletra2)} align='center' component="th" scope="row">
                        {row.mes}
                      </TableCell>
                      <TableCell className={clsx(classes.colorTextoPrimario, classes.tipoletra2)} align="center">{row.year}</TableCell>
                      <TableCell className={clsx(classes.colorTextoPrimario, classes.tipoletra2)} align="center">{row.dni}</TableCell>
                      <TableCell className={clsx(classes.colorTextoPrimario, classes.tipoletra2)} align="center">{row.nombres}</TableCell>
                      <TableCell className={clsx(classes.colorTextoPrimario, classes.tipoletra2)} align="center">{row.apellidos}</TableCell>
                      <TableCell className={clsx(classes.colorTextoPrimario, classes.tipoletra2)} align="center">
                        <IconButton onClick = {accionPdf} edge="end">
                          <img className={clsx(classes.iconoAcciones)} src = './images/Recurso8.png'/>
                        </IconButton>
                      </TableCell>
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

export default ReportePlanillas;