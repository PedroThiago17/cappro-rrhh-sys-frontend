import React, { useState, useEffect } from 'react';
import _ from 'lodash'
import { makeStyles } from '@material-ui/core/styles';
import { Delete, Edit, Visibility } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';
import UserTable from '../Comunes/UserTable';
import RegistroInput from '../Comunes/RegistroInput';
import UserList from '../Comunes/UserList';
import { rpKeys, rpTableHeaders } from '../../constants/constants';
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';
import { usuariosPlanillas } from '../../constants/constants';
import ReporteTable from './ReporteTable';
import './styles/styles.css'
import ReporteUserList from './ReporteUserList';
import PageLoader from '../Loading';


const ReportePlanillas = (props) => {
  const isTablet = useMediaQuery({ query: '(max-width: 640px)' })
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notData, setNotData] = useState(false);
  const [userRol, setUserRol] = useState('');
  const [foundUsers, setFoundUsers] = useState([]);
  const [search, setSearch] = useState(
    {
      dni: '',
      nombres: '',
      apellidos: '',
      codModular: 0
    }
  );
  useEffect(() => {
    const getUsers = async () => {
      const userData = window.localStorage.getItem('userInfo');
      if (userData) {
        const user = JSON.parse(userData);
        console.log('ROL: ', user.rol)
        setUserRol(user.rol);
      }
      const userId = window.localStorage.getItem('userId').toString();
      if (userId) {
        try {
          setLoading(true);
          
          const { data } = await axios.get(`https://cappro-rrhh-sys.azurewebsites.net/boletas/obtenerBoletasUsuario/${userId}`)
          if (data.length != 0) {
            console.log(data)
            setUsers(data)
          } else {
            setNotData(true)
          }
        } catch (error) {
          console.log('error: ', error)
        } finally {
          setLoading(false);
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
        setSearch({ dni: newValue })
      }
    }
  }

  const onClickFindUser = () => {
    if (search.dni != '') {
      const foundUser = users.find(e => e.dni === search.dni);
      if (foundUser) {
        setFoundUsers([foundUser]);
        console.log(foundUser)
      }else{
        alert('El DNI ingresado no existe.')
      }
    }else {
      alert('No ingreso el DNI a buscar.')
    }
  }

  const onCleanSearcher = () => {
    setFoundUsers([]);
    setSearch({
      dni: '',
      nombres: '',
      apellidos: '',
      codModular: 0
    });
  }

  return (
    <div className='module-container'>
      <form className='module-form'>
        <div className='mp-form-container'>
          <h2 className='h2-title'>REPORTE DE PLANILLAS</h2>
          {
            userRol !== 'Personal' &&
            <div className='mp-form-content'>
              <div className='form-inputs' style={{marginLeft:'20%', }}>
                <div className='input-container'>
                  <label htmlFor="">DNI:</label>
                  <input name='dni' type='number' required value={search.dni} onChange={(e) => handleNumberChange(e, 8)} />
                </div>
                <RegistroInput label={'Nombres:'}></RegistroInput>
                <RegistroInput label={'Apellidos:'}></RegistroInput>
                
              </div>
              <div className='main-button-container'>
                <button type='button' className='main-button' onClick={onClickFindUser}>Buscar</button>
                <button type='button' className='main-button' onClick={onCleanSearcher}>Limpiar</button>
              </div>
            </div>
          }
          {
            loading ?
              <div style={{ height: '55vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <PageLoader />
              </div>
              :
              isTablet ?
                <ReporteUserList
                  foundUsers={foundUsers}
                  users={users}
                  view={'Reporte Planillas'}
                  notData={notData}
                />
                :
                <ReporteTable
                  headers={rpTableHeaders}
                  foundUsers={foundUsers}
                  users={users}
                  notData={notData}>
                </ReporteTable>
          }
        </div>
      </form>
    </div>
  );
}

export default ReportePlanillas;