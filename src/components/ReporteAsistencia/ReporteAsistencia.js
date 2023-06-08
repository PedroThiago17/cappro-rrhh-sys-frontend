import React, { useState, useEffect } from 'react';
import _ from 'lodash'
import { makeStyles } from '@material-ui/core/styles';
import RegistroInput from '../Comunes/RegistroInput';
import { raTableHeaders } from '../../constants/constants';
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';
import AsistenciaTable from './AsistenciaTable';
import AsistenciaList from './AsistenciaList';
import PageLoader from '../Loading';


const ReporteAsistencia = (props) => {
  const isTablet = useMediaQuery({ query: '(max-width: 640px)' })
  const [notData, setNotData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [asistenciaData, setAsistenciaData] = useState([]);
  const [foundUsers, setFoundUsers] = useState([]);
  const [user, setUser] = useState({});
  const [userRol, setUserRol] = useState('');
  const [search, setSearch] = useState(
    {
      dni: '',
      nombres: '',
      apellidos: '',
      codModular: 0
    }
  );
  useEffect(() => {
    /*     const getUsers = async () => {
          const userId = window.localStorage.getItem('userId').toString();
          if (userId) {
            try {
              setLoading(true)
              const { data } = await axios.get(`https://cappro-rrhh-sys.azurewebsites.net/usuario/getAllUsuariosPorSupervisor/${userId}`)
              if (data.length != 0) {
                setLoading(false)
                setUsers(data)
              } else {
                setNotData(true)
              }
            } catch (error) {
              console.log('error: ', error)
            }
          }
        } */
    const getData = async () => {
      try {
        setLoading(true)
        const userData = window.localStorage.getItem('userInfo');
        if (userData) {
          const user = JSON.parse(userData);
          const userId = user.idUsuario;
          setUserRol(user.rol);

          const { data } = await axios.get(`https://cappro-rrhh-sys.azurewebsites.net/asistencia/obtenerAsistenciasUsuario/${userId}`);
          console.log('asistencia: ', data)

          if (data.length !== 0) {
            setAsistenciaData(data);
          }
        }
      } catch (error) {
        console.log('error: ', error)
        setNotData(true)
      } finally {
        setLoading(false)
      }
    }
    getData();
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
      const foundUser = asistenciaData.find(e => e.dni === search.dni);
      if (foundUser) {
        setFoundUsers([foundUser]);
        console.log(foundUser)
      }else{
        alert('El DNI ingresado no existe.')
      }
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
          <h2 className='h2-title'>REPORTE DE ASISTENCIA</h2>
          {
            userRol !== 'Personal'&&
            <div className='mp-form-content'>
              <div className='form-inputs'>
                <div className='input-container'>
                  <label>DNI</label>
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
          }
          {
            loading ?
              <div style={{ height: '55vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <PageLoader />
              </div>
              :
              isTablet ?
                <AsistenciaList
                  foundUsers={foundUsers}
                  asistenciaData={asistenciaData}
                  user={user}
                  view='Reporte Asistencia'
                  notData={notData}
                >
                </AsistenciaList>
                :
                <AsistenciaTable
                  headers={raTableHeaders}
                  foundUsers={foundUsers}
                  asistenciaData={asistenciaData}
                  user={user}
                  view='Reporte Asistencia'
                  notData={notData}>
                </AsistenciaTable>
          }
        </div>
      </form>
    </div>
  );
}

export default ReporteAsistencia;