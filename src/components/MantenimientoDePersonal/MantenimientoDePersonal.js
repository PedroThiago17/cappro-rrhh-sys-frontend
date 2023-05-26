import React, { useEffect, useState } from 'react';
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
import axios from 'axios';
import UserTable from '../Comunes/UserTable';
import { mpKeys, mpTableHeaders } from '../../constants/constants';
import UserList from '../Comunes/UserList';
import { useMediaQuery } from 'react-responsive';
import UserModal from '../Modal/UserModal';
import DeleteModal from '../Modal/DeleteModal';

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


const MantenimientoDePersonal = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedId, setSelectedId] = useState(0);
  const [userToDelete, setUserToDelete] = useState(0);
  const [notData, setNotData] = useState(false);
  const [foundUsers, setFoundUsers] = useState([]);
  const isTablet = useMediaQuery({ query: '(max-width: 640px)' })
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
          const { data } = await axios.get(`https://cappro-rrhh-sys.azurewebsites.net/usuario/getAllUsuariosPorSupervisor/${userId}`)
          if (data.length != 0) {
            setUsers(data)
          } else {
            setNotData(true)
          }
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


  const handleNumberChange = (e, limit) => {
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
  }

  const onClickFindUser = () => {
    if (search.dni != '') {
      const foundUser = users.find(e => e.datosPersonales.dni === search.dni);
      if (foundUser) {
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
  const handleViewUser = (userId) => {
    console.log('ID: ', userId)
    setSelectedId(userId)
    setShowModal(true);
  }
  const handleDelete = async (user) => {
    setShowDeleteModal(true);
    setUserToDelete(user)
  }

  return (
    <>
      {
        showModal && <UserModal setShowModal={setShowModal} selectedId={selectedId}/>
      }
      {
        showDeleteModal && <DeleteModal setShowDeleteModal={setShowDeleteModal} userToDelete={userToDelete}/>
      }
      <div className={`module-container `}>
        <form className='module-form'>
          <div className='mp-form-container'>
            <h2 className='h2-title'>MANTENIMIENTO DE PERSONAL</h2>
            <div className='mp-form-content'>
              <div className='form-inputs'>
                <div className='input-container'>
                  <label htmlFor="">DNI</label>
                  <input name='dni' type='number' required value={search.dni} onChange={(e) => handleNumberChange(e, 8)} />
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
            {
              
                isTablet ?
                  <UserList
                    foundUsers={foundUsers}
                    users={users}
                    handleViewUser={handleViewUser}
                    handleDelete={handleDelete}
                    view='Mantenimiento Personal'
                    notData={notData}
                  />
                  :
                  <UserTable
                    headers={mpTableHeaders}
                    foundUsers={foundUsers}
                    handleViewUser={handleViewUser}
                    handleDelete={handleDelete}
                    users={users}
                    view='Mantenimiento Personal'
                    notData={notData}>
                  </UserTable>
            }
          </div>
        </form>
      </div>
    </>

  );
}

export default MantenimientoDePersonal;