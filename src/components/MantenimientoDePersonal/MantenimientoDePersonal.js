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
import PageLoader from '../Loading';
import { searchUser } from '../../utils/utils';
import UserEditModal from '../Modal/UserEditModal';

const MantenimientoDePersonal = () => {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [userRol, setUserRol] = useState('');
  const [selectedId, setSelectedId] = useState(0);
  const [userToDelete, setUserToDelete] = useState(0);
  const [notData, setNotData] = useState(false);
  const [foundUsers, setFoundUsers] = useState([]);
  const isTablet = useMediaQuery({ query: '(max-width: 640px)' })
  const [search, setSearch] = useState(
    {
      dni: '',
      nombres: '',
      apellidos: '',
      codigoModular: ''
    }
  );

  useEffect(() => {
    const getUsers = async () => {
      const userData = window.localStorage.getItem('userInfo').toString();
      if (userData) {
        const userInfo = JSON.parse(userData);
        setUserRol(userInfo.rol);
      }
      const userId = window.localStorage.getItem('userId').toString();
      if (userId) {
        try {
          setLoading(true);
          const { data } = await axios.get(`https://cappro-rrhh-sys.azurewebsites.net/usuario/getAllUsuariosPorSupervisor/${userId}`)
          setLoading(false);
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

  const handleNumberChange = (e, limit) => {
    const value = e.target.value;
    const name = e.target.name;

    const newValue = value.replace(/[^0-9]/g, '').substring(0, limit);

    if (name === 'dni') {
      if (newValue[0] === "0") {
        return;
      }
      else {
        setSearch({ ...search, dni: newValue })
      }
    }
    else if (name === 'codigoModular') {
      setSearch({ ...search, codigoModular: newValue })
    }
  }
  const handleChange = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value
    })
  }

  const onClickFindUser = () => {

    const user = searchUser(search, users)

    if (user) setFoundUsers([user]);

  }

  const onCleanSearcher = () => {
    setFoundUsers([]);
    setSearch({
      dni: 0,
      codigoModular: '',
      nombres: '',
      apellidos: '',
      codModular: ''
    });
  }

  const navigate = useNavigate();

  const handleViewUser = (userId) => {
    setSelectedId(userId)
    setShowModal(true);
    if(setShowModal(false)){
      alert("El usuario fue editado de manera correcta.")
    }
  }
    const handleVEditUser = (userId) => {
    setSelectedId(userId)
    setShowEditModal(true);
  }
  const handleDelete = async (user) => {
    setShowDeleteModal(true);
    setUserToDelete(user)
  }

  return (
    <>
      {
        showModal && <UserModal setShowModal={setShowModal} selectedId={selectedId} />
      }
      {
        showEditModal && <UserEditModal setShowEditModal={setShowEditModal} selectedId={selectedId} />
      }
      {
        showDeleteModal && <DeleteModal setShowDeleteModal={setShowDeleteModal} userToDelete={userToDelete} />
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
                <div className='input-container'>
                  <label>Nombres:</label>
                  <input name='nombres' type='text' required value={search.nombres} maxLength={60} onChange={(e) => handleChange(e)} />
                </div>
                <div className='input-container'>
                  <label>Apellidos:</label>
                  <input name='apellidos' type='text' required value={search.apellidos} maxLength={60} onChange={(e) => handleChange(e)} />
                </div>
                <div className='input-container'>
                  <label htmlFor="">Código modular:</label>
                  <input name='codigoModular' type='text' required value={search.codigoModular} onChange={(e) => handleNumberChange(e, 20)} />
                </div>
                {/* <RegistroInput label={'Nombres:'}></RegistroInput>
                <RegistroInput label={'Apellidos:'}></RegistroInput>
                <RegistroInput label={'Código Modular:'}></RegistroInput> */}
              </div>
              <div className='main-button-container'>
                <button type='button' className='main-button' onClick={onClickFindUser}>Buscar</button>
                <button type='button' className='main-button' onClick={onCleanSearcher}>Limpiar</button>
              </div>
            </div>
            {
              loading ?
                <div style={{ height: '55vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <PageLoader />
                </div>
                :
                isTablet ?
                  <UserList
                    foundUsers={foundUsers}
                    users={users}
                    userRol={userRol}
                    handleViewUser={handleViewUser}
                    handleVEditUser={handleVEditUser}
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
                    handleVEditUser={handleVEditUser}
                    userRol={userRol}
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