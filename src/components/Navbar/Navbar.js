import React from 'react'
import './styles/navbar.css'
import { IconButton } from '@material-ui/core'
import { useNavigate } from 'react-router-dom';
import USUARIOLOGEADO  from '../../Global/Globals';
const Navbar = () => {
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
            <h3>Escuela superior de arte dramático de trujillo</h3>
            <h2>VIRGILIO RODRIGUEZ NACHE</h2>
            <p>Autorizado por D.S N 055-1985-ED / Resolución N1 0360-2011-ANR</p>
          </div>
        </div>
        <div className='navbar-logout'>
          <div className='navbar-user'>
            <p>BIENVENIDO</p>
            <p>{USUARIOLOGEADO.nombre} {USUARIOLOGEADO.apellidos}</p>
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
