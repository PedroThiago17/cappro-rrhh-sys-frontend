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
import { searchUserPlanillas, searchUsersPlanillas } from '../../utils/utils';


const ReporteAsistencia = (props) => {
  const isTablet = useMediaQuery({ query: '(max-width: 640px)' })
  const [notData, setNotData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [asistenciaData, setAsistenciaData] = useState([]);
  const [foundUsers, setFoundUsers] = useState([]);
  /* const [user, setUser] = useState({}); */
  const [search, setSearch] = useState(
    {
      dni: '',
      nombres: '',
      apellidos: '',
    }
  );

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true)
        const userData = window.localStorage.getItem('userInfo');
        if (userData) {
          const user = JSON.parse(userData);
          const userId = user.idUsuario;

          const { data } = await axios.get(`https://cappro-rrhh-sys.azurewebsites.net/asistencia/obtenerAsistenciasUsuario/${userId}`);

          if (data.length !== 0) {
            setAsistenciaData(data);
/*             setUser({
              dni: user.datosPersonales.dni,
              nombres: user.datosPersonales.nombres,
              apellidos: user.datosPersonales.apellidos,
            }) */
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
        setSearch({ ...search, dni: newValue })
      }
    }
  }
  const onClickFindUser = () => {
    const user = searchUsersPlanillas(search, asistenciaData)
    if (user) setFoundUsers(user);
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
          <h2 className='h2-title'>REPORTE DE ASISTENCIA</h2>
          <div className='mp-form-content'>
            <div className='form-inputs'>
              <div className='input-container'>
                <label>DNI:</label>
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
                  notData={notData}
                >
                </AsistenciaList>
                :
                <AsistenciaTable
                  headers={raTableHeaders}
                  foundUsers={foundUsers}
                  asistenciaData={asistenciaData}
                  notData={notData}>
                </AsistenciaTable>
          }
        </div>
      </form>
    </div>
  );
}

export default ReporteAsistencia;