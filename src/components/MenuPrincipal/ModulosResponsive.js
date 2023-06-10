import React, { useState } from 'react';
import _ from 'lodash'
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemIcon, ListItemText, Collapse, IconButton } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus } from 'react-icons/fa'
import './styles/modulos.css'
import FotoPasos from '../FotoPasos/FotoPasos';
import Modal from '../Modal/Modal';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
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
}));

const ModulosResponsive = ({ userRol }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [dni, setDni] = useState('');

  const handleClick = () => {
    setOpen(!open);
  };
  const onSubmit = (url) => {
    navigate(url);
  }
  const onClickTomarFoto = () => {
    const dni = window.localStorage.getItem('userDNI');
    if (dni && dni.length === 8) {
      setDni(dni)
      setShowModal(true);
    }
  }
  return (
    <>
      {
        showModal &&
        <Modal setShowModal={setShowModal}>
          <FotoPasos dni={dni} codigo={2}></FotoPasos>
        </Modal>
      }
      <div className='modulos-container-responsive' style={{ pointerEvents: showModal ? 'none' : 'auto' }}>

        <div className='options-container' style={{height:'100%'}}>
          {
            (userRol === 'Administrador' || userRol === 'Supervisor') &&
            <>
              {
                userRol === 'Administrador' &&
                <div title='Registro de personal'>
                  <ListItem button style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={() => onSubmit('/registropersonal')}>
                    <FaUserPlus style={{ fontSize: '30px' }} ></FaUserPlus>
                  </ListItem>
                </div>
              }
              <div title='Mantenimiento de personal'>
                <ListItem button style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={() => onSubmit('/mantenimientopersonal')}>
                  <img style={{ width: '35px' }} className={clsx(classes.iconoPrincipal)} src='./images/Recurso4.png' />
                </ListItem>
              </div>
            </>
          }
          <div title='Reporte de plantilla'>
            <ListItem button style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={() => onSubmit('/reporteplanilla')}>
              <img style={{ width: '25px' }} className={clsx(classes.iconoPrincipal)} src='./images/Recurso5.png' />
            </ListItem>
          </div>
          <div title='Reporte de asistencia'>
            <ListItem button style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={() => onSubmit('/reporteasistencia')}>
              <img style={{ width: '25px' }} className={clsx(classes.iconoPrincipal)} src='./images/Recurso6.png' />
            </ListItem>
          </div>
          <div title='Asistencia' style={{marginBottom:'250px'}}>
            <ListItem button style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={onClickTomarFoto}>
              <img style={{ width: '25px'}} className={clsx(classes.iconoPrincipal)} src='./images/Recurso9.png' />
            </ListItem>
          </div>
        </div>
      </div>
    </>

  )
}

export default ModulosResponsive
