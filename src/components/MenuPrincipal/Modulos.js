import React, { useState } from 'react';
import _ from 'lodash'
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemIcon, ListItemText, Collapse, IconButton } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import './styles/modulos.css'
import Modal from '../Modal/Modal';
import FotoPasos from '../FotoPasos/FotoPasos';

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
}));

const Modulos = ({ userRol }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [showModal, setShowModal] = useState(false);
  const [dni, setDni] = useState('');
  const navigate = useNavigate();

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
      <div className='modulos-container' style={{ pointerEvents: showModal ? 'none' : 'auto', position: 'relative'}}>

        <div>
          {
            (userRol === 'Administrador' || userRol === 'Supervisor') &&
            <>
              <ListItem style={{ padding: 20 }} button onClick={handleClick}>
                <ListItemIcon>
                  <img style={{ marginLeft: 10, width: '56%', height: '56%' }} src='./images/Recurso4.png' />
                </ListItemIcon>
                <ListItemText disableTypography primary="Gestión de Personal" className={clsx(classes.tipoletra2)} />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component='div' disablePadding>
                  {userRol === 'Administrador' &&
                    <ListItem button onClick={() => onSubmit('/registropersonal')}>
                      <ListItemIcon>
                        <img style={{ marginLeft: 40 }} src='./images/Recurso7.png' />
                      </ListItemIcon>
                      <ListItemText disableTypography className={clsx(classes.tipoletra1)} primary='Registro de Personal' />
                    </ListItem>
                  }
                  <ListItem button onClick={() => onSubmit('/mantenimientopersonal')}>
                    <ListItemIcon>
                      <img style={{ marginLeft: 40 }} src='./images/Recurso7.png' />
                    </ListItemIcon>
                    <ListItemText disableTypography component='div' className={clsx(classes.tipoletra1)} primary='Mantenimiento de personal' />
                  </ListItem>
                </List>
              </Collapse>
            </>
          }
          <ListItem style={{ padding: 20 }} button onClick={() => onSubmit('/reporteplanilla')}>
            <ListItemIcon>
              <img className={clsx(classes.iconoPrincipal)} src='./images/Recurso5.png' />
            </ListItemIcon>
            <ListItemText disableTypography className={clsx(classes.tipoletra2)} primary="Reporte de Planillas" />
          </ListItem>
          <ListItem style={{ padding: 20 }} button onClick={() => onSubmit('/reporteasistencia')}>
            <ListItemIcon>
              <img className={clsx(classes.iconoPrincipal)} src='./images/Recurso6.png' />
            </ListItemIcon>
            <ListItemText disableTypography className={clsx(classes.tipoletra2)} primary="Reporte de Asistencia" />
          </ListItem>
          <div onClick={onClickTomarFoto} className='assistance-button'>
            <button className='main-button' style={{fontSize:'21px'}}>
              Asistencia
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modulos
