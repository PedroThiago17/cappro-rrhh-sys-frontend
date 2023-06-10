import React, { useEffect, useState } from 'react'
import './styles/navbar.css'
import { IconButton } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import USUARIOLOGEADO  from '../../Global/Globals';
const Navbar = (selectedId) => {
  const navigate = useNavigate();
  const onSubmit = (url) => {
    window.localStorage.clear('userId')    
    navigate(url);
  }
  
  return (
    <nav className='navbar'>
      <div className='navbar-content'>
        <div className='navbar-content-info'>
          <div className='navbar-logo'>
            <img src='./images/Recurso1.png' />
          </div>
          <div className='navbar-text'>
            <h3>Escuela Superior de Arte Dramático de Trujillo</h3>
            <h2>VIRGILIO RODRIGUEZ NACHE</h2>
            <p>Autorizado por D.S N 055-1985-ED / Resolución N1 0360-2011-ANR</p>
          </div>
        </div>
        <div className='navbar-logout'>
          <div className='navbar-user'>
            <p>BIENVENIDO</p>
            <p className='navbar-user-name'>{USUARIOLOGEADO.nombre} {USUARIOLOGEADO.apellidos}</p>
            <p className='navbar-user-name'>Rol: {USUARIOLOGEADO.rol}</p>
          </div>
          <IconButton onClick={() => onSubmit('/')}>
            <img src='./images/Recurso10.png' />
          </IconButton>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
