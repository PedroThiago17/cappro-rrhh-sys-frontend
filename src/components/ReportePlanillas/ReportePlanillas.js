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
import { searchUser, searchUserPlanillas } from '../../utils/utils';


const ReportePlanillas = (props) => {
  const isTablet = useMediaQuery({ query: '(max-width: 640px)' })
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notData, setNotData] = useState(false);
  const [foundUsers, setFoundUsers] = useState([]);
  const [userRol, setUserRol] = useState('');
  const [search, setSearch] = useState(
    {
      dni: '',
      nombres: '',
      apellidos: '',
    }
  );
  useEffect(() => {
    const getUsers = async () => {
      const userData = window.localStorage.getItem('userInfo');
      if (userData) {
        const user = JSON.parse(userData);
        setUserRol(user.rol);
      }
      const userId = window.localStorage.getItem('userId').toString();
      if (userId) {
        try {
          setLoading(true);

          const { data } = await axios.get(`https://cappro-rrhh-sys.azurewebsites.net/boletas/obtenerBoletasUsuario/${userId}`)
          if (data.length != 0) {
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

  const onClickFindUser = () => {
    const user = searchUserPlanillas(search, users)
    if (user) setFoundUsers([user]);
  }

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
  }
  const handleChange = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value
    })
  }
  const onCleanSearcher = () => {
    setFoundUsers([]);
    setSearch({
      dni: '',
      nombres: '',
      apellidos: '',
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
              <div className='form-inputs'>
                <div className='input-container'>
                  <label htmlFor="">DNI:</label>
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