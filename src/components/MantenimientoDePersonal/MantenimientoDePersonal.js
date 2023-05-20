import React, { useEffect, useState } from 'react';
import _ from 'lodash'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, List, ListItem, ListItemIcon, ListItemText, Collapse, MenuItem, FormControl, InputLabel, Select, Modal } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import clsx from 'clsx';
import RegistroInput from '../Comunes/RegistroInput'; 
import './styles/mantenimientoPersonal.css'
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import Visibility from '@material-ui/icons/Visibility';
import { useNavigate } from 'react-router-dom';
import NavBar from '../MenuPrincipal/NavBar';
import axios from 'axios';
import { JUBILACION, VALOR_TIEMPO_COMPLETO, VALOR_TIEMPO_PARCIAL, PORCENTAJE, estadoCivilOptions, sexoOptions } from '../../constants/constants';
import { calcularEdad } from '../../utils/utils';
import PageLoader from '../Loading';
import ModalVisualizacion from './Modal/ModalVisualizacion';
import USUARIOEDITAR from '../../Global/UsuarioEditas';


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
  modalVisual: {
    position: 'absolute',
    top: '15%',
    left: '20%',
    width: 1400,
    height: 740,
    border: '2px solid #0066CC',
    backgroundColor: 'white',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2,4,3,4),
    background: 'rgba(0,0,0,.5)'
  }
}));

const data = [
  { dni: '99999999', nombres: 'Juan', apellidos: 'Pérez', codigo: '123', id: '1' },
  { dni: '99999999', nombres: 'María', apellidos: 'Gómez', codigo: '456', id: '2' },
  { dni: '99999999', nombres: 'Pedro', apellidos: 'Rodríguez', codigo: '789', id: '3' },
];


const MantenimientoDePersonal = () => {
  const classes = useStyles();
  const [idBuscado, setIdBuscado] = useState();
  const [dniSeleccionado, setDniSeleccionado] = useState();
  const [open, setOpen] = React.useState(true);
  const [users, setUsers] = useState([]);
  const [foundUsers, setFoundUsers] = useState([]);
  const [search, setSearch] = useState(
    {
      dni: 0,
      nombres: '',
      apellidos: '',
      codModular: 0
    }
  );

  useEffect(() => {
    const getUsers = async () => {
      const userId = window.localStorage.getItem('userId').toString();
      if (userId) {
        try {
          console.log('userId: ', userId.toString())
          const { data } = await axios.get(`https://cappro-rrhh-sys.azurewebsites.net/usuario/getAllUsuariosPorSupervisor/${userId}`)
          console.log('response: ', data)
          setUsers(data)
        } catch (error) {
          console.log('error: ', error)
        }
      }
    }
    getUsers();
  }, [])

  
  const handleClick = () => {
    setOpen(!open);
  };

  const [rows, setRows] = useState(data);

  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleNumberChange2 = (e, limit) => {
    const value = e.target.value;
    const name = e.target.name;

    const newValue = value.replace(/[^0-9]/g, '').substring(0, limit);

    if (name === 'dni') {
      if (newValue[0] === "0") {
        return;
      }
      else {
        setSearch({ dni: newValue })
      }
    }
    /*     else if (name === 'experiencia') {
          setExperiencia(newValue)
        }
        else if (name === 'codigoModular') {
          setCodigoModular(newValue)
        }
        else {
          setTelefono(newValue)
        } */
  }

  const onClickFindUser = () => {
    console.log('dni: ', search.dni)

    if (search.dni != '') {
      console.log('dni: ', search.dni)
      const foundUser = users.find(e => e.datosPersonales.dni === search.dni);
      if (foundUser) {
        console.log('foundUser: ', foundUser)
        setFoundUsers([foundUser]);
      }
    }
  }

  const onCleanSearcher = () => {
    setFoundUsers([]);
    setSearch({
      dni: 0,
      nombres: '',
      apellidos: '',
      codModular: 0
    });
  }

  const navigate = useNavigate();
  const onSubmit = (url) => {
    navigate(url);
    console.log(url);
  }

  const [modal, setModal]=useState(false);
  const abrirCerrarModal =(dni)=>{
    const aux = dni;
    setDniSeleccionado(aux);
   
    RetornarIdUsuario();
    
  }

  const RetornarIdUsuario = async (event) => {
    // const data = useEffect()
    setIdBuscado(0);
    const userId = window.localStorage.getItem('userId').toString();
    const { data } = await axios.get(`https://cappro-rrhh-sys.azurewebsites.net/usuario/getAllUsuariosPorSupervisor/${userId}`)
    const elementoEncontrado = data.find( usuario => usuario.datosPersonales.dni === dniSeleccionado);
    USUARIOEDITAR.idUsuario = elementoEncontrado.idUsuario;
    USUARIOEDITAR.correo = elementoEncontrado.correo
    USUARIOEDITAR.nombres = elementoEncontrado.datosPersonales.nombres
    USUARIOEDITAR.apellidos = elementoEncontrado.datosPersonales.apellidos
    USUARIOEDITAR.dni = elementoEncontrado.datosPersonales.dni
    console.log('Dato: ',USUARIOEDITAR.dni)
    USUARIOEDITAR.lnacimiento = elementoEncontrado.datosPersonales.lnacimiento
    USUARIOEDITAR.direccion = elementoEncontrado.datosPersonales.direccion
    USUARIOEDITAR.edad = elementoEncontrado.datosPersonales.edad
    USUARIOEDITAR.telefono = elementoEncontrado.datosPersonales.telefono
    USUARIOEDITAR.sexo = elementoEncontrado.datosPersonales.sexo
    USUARIOEDITAR.fnacimiento = elementoEncontrado.datosPersonales.fnacimiento
    USUARIOEDITAR.estadoCivil = elementoEncontrado.datosPersonales.estadoCivil
    USUARIOEDITAR.fingreso = elementoEncontrado.datosLaborales.fingreso
    USUARIOEDITAR.universidad = elementoEncontrado.datosLaborales.universidad
    USUARIOEDITAR.aniosExpe = elementoEncontrado.datosLaborales.aniosExpe
    USUARIOEDITAR.especialidad = elementoEncontrado.datosLaborales.especialidad
    USUARIOEDITAR.rol = elementoEncontrado.rol
  
    USUARIOEDITAR.formacion = elementoEncontrado.datosLaborales.formacion
    USUARIOEDITAR.idUsuarioSup = elementoEncontrado.idUsuarioSup
    USUARIOEDITAR.codModular = elementoEncontrado.datosPlanilla.codModular
    USUARIOEDITAR.idDomModalidad = elementoEncontrado.datosPlanilla.idDomModalidad
    USUARIOEDITAR.cargaHoraria = elementoEncontrado.datosPlanilla.cargaHoraria
    USUARIOEDITAR.pagoHora = elementoEncontrado.datosPlanilla.pagoHora
    setModal(!modal);
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
                <div className='input-container'>
                  <label htmlFor="">DNI</label>
                  <input name='dni' type='number' required value={search.dni} onChange={(e) => handleNumberChange2(e, 8)} />
                </div>
                <RegistroInput label={'Nombres:'}></RegistroInput>
                <RegistroInput label={'Apellidos:'}></RegistroInput>
                <RegistroInput label={'Código Modular:'}></RegistroInput>
              </div>
              <div className='main-button-container'>
                <button type='button' className='main-button' onClick={onClickFindUser}>Buscar</button>
                <button type='button' className='main-button' onClick={onCleanSearcher}>Limpiar</button>
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
              <div className='table-content-container'>
                {
                  foundUsers.length != 0 ?
                    foundUsers.map(({ datosPersonales, datosPlanilla, datosLaborales }, index) => (
                      <div key={index} className='table-content'>
                        <p>{datosPersonales.dni}</p>
                        <p>{datosPersonales.nombres}</p>
                        <p>{datosPersonales.apellidos}</p>
                        <p>{datosPlanilla.codModular}</p>
                        <div className='mp-buttons-container'>
                          <Visibility style={{ cursor: 'pointer' }}  />
                          <Edit style={{ cursor: 'pointer' }} />
                          <Delete style={{ cursor: 'pointer', color: 'red' }} />
                        </div>
                      </div>
                    ))
                    :
                    users.map(({ datosPersonales, datosPlanilla, datosLaborales }, index) => (
                      <div key={index} className='table-content'>
                        <p>{datosPersonales.dni}</p>
                        <p>{datosPersonales.nombres}</p>
                        <p>{datosPersonales.apellidos}</p>
                        <p>{datosPlanilla.codModular}</p>
                        <div className='mp-buttons-container'>
                          <Visibility style={{ cursor: 'pointer' }} onClick={()=>abrirCerrarModal(datosPersonales.dni)} />
                          <Modal
                          keepMounted 
                          open={modal}
                          onClose={abrirCerrarModal}
                          >{<ModalVisualizacion/>}
                          </Modal>
                          <Edit style={{ cursor: 'pointer' }} />
                          <Delete style={{ cursor: 'pointer', color: 'red' }} />
                        </div>
                      </div>
                    ))
                }
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MantenimientoDePersonal;