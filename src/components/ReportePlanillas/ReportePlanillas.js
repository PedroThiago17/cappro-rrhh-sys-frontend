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
  colorTextoSecundario: {
    color: theme.palette.secondary.main,
  },
}));

const ReportePlanillas = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const isTablet = useMediaQuery({ query: '(max-width: 640px)' })
  const [users, setUsers] = useState([]);
  const [notData, setNotData] = useState(false);
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

  return (
    <div className='module-container'>
      <form className='module-form'>
        <div className='mp-form-container'>
          <h2 className='h2-title'>REPORTE DE PLANILLAS</h2>
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
              <button type='button' className='main-button' >Buscar</button>
              <button type='button' className='main-button' >Limpiar</button>
            </div>
          </div>
          {
            
            isTablet ?
              <ReporteUserList
                foundUsers={[]}
                users={users}
                view={'Reporte Planillas'}
                notData = {notData}
              />
              :
              <ReporteTable
                headers={rpTableHeaders}
                foundUsers={[]}
                users={users} 
                notData ={notData}>
                <div className='mp-buttons-container'>
                  <img src='./images/Recurso8.png' />
                </div>
              </ReporteTable>
          }
        </div>
      </form>
    </div>
  );
}

export default ReportePlanillas;