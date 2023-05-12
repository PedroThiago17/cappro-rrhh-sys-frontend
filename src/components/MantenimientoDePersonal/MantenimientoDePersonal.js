import React, { useState } from 'react';
import _ from 'lodash'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, List, ListItem, ListItemIcon, ListItemText, Collapse, MenuItem, FormControl, InputLabel, Select } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import clsx from 'clsx';
import RegistroInput from '../Comunes/RegistroInput'
import './styles/mantenimientoPersonal.css'
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import Visibility from '@material-ui/icons/Visibility';
import { useNavigate } from 'react-router-dom';
import NavBar from '../MenuPrincipal/NavBar';


const useStyles = makeStyles((theme) => ({
  root: {
    height: "98vh",
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
  contenedorFormulario: {
    width: "130vh",
    height: "80%",
    marginLeft: '18%',
    position: 'absolute',
    textAlign: 'center',
    marginTop: 50,
    display: 'flex',
    flexDirection: 'column'
  },
  formulario: {
    marginLeft: '6%',
    boxShadow: theme.shadows[6],
    width: "150vh",
    height: '90%',
  },
  formControl: {
    minWidth: 120,
    height: '50px', // Altura deseada
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#0066CC'
      },
    },
  },
}));

const data = [
  { dni: '99999999', nombres: 'Juan', apellidos: 'Pérez', codigo: '123', id: '1' },
  { dni: '99999999', nombres: 'María', apellidos: 'Gómez', codigo: '456', id: '2' },
  { dni: '99999999', nombres: 'Pedro', apellidos: 'Rodríguez', codigo: '789', id: '3' },
];

/* function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
} */
const MantenimientoDePersonal = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const [rows, setRows] = useState(data);

  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };
  const navigate = useNavigate();
  const onSubmit = (url) => {
    navigate(url);
    console.log(url);
  }

  return (
    <div className={clsx(classes.root)}>
      <NavBar />
      <div className={clsx(classes.contenedorFormulario)}>
        <form className={clsx(classes.formulario)}>
          <div className='mp-form-container'>
            <h2>MANTENIMIENTO DE PERSONAL</h2>
            <div className='mp-form-content'>
              <div className='form-inputs'>
                <RegistroInput label={'DNI:'}></RegistroInput>
                <RegistroInput label={'Nombres:'}></RegistroInput>
                <RegistroInput label={'Apellidos:'}></RegistroInput>
                <RegistroInput label={'Código Modular:'}></RegistroInput>
              </div>
              <div className='main-button-container'>
                <button className='main-button'>Buscar</button>
              </div>
            </div>
            <div className='table-container'>
              <div className='table-header'>
                <p>DNI</p>
                <p>Nombres</p>
                <p>Apellidos</p>
                <p>Codigo Modular</p>
                <p>Acciones</p>
              </div>
              {
                data.map(user => (
                  <div className='table-content'>
                    <p>{user.dni}</p>
                    <p>{user.nombres}</p>
                    <p>{user.apellidos}</p>
                    <p>{user.codigo}</p>
                    <div className='mp-buttons-container'>
                      <Visibility style={{cursor: 'pointer'}} />
                      <Edit style={{cursor: 'pointer'}}/>
                      <Delete style={{cursor:'pointer', color:'red'}} />
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MantenimientoDePersonal;