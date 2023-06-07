import React, { useEffect, useState } from 'react';
import _ from 'lodash'
import { makeStyles } from '@material-ui/core/styles';
import { Outlet } from 'react-router-dom';
import './styles/menu.css'
import Navbar from '../Navbar/Navbar';
import Modulos from './Modulos';
import { useMediaQuery } from 'react-responsive'
import ModulosResponsive from './ModulosResponsive';

const MenuPrincipal = () => {

  const isTablet = useMediaQuery({ query: '(max-width: 768px)' })
  const [userRol, setUserRol] = useState('');
  useEffect(() => {
    const getUserRol = async () => {
      try {
        const userData = window.localStorage.getItem('userInfo');
        if (userData) {
          const user = JSON.parse(userData);
          setUserRol(user.rol);
        }
      } catch (error) {
        console.log('error: ', error)
      }
    }
    getUserRol();
  }, [])
  return (
    <main className='app-layout'>
      <Navbar></Navbar>
      <div className='main-container'>
        {
          isTablet ? <ModulosResponsive userRol={userRol} /> : <Modulos userRol={userRol} />
        }
        <div className='content'>
          <Outlet />
        </div>
      </div>
    </main>
  );
}

export default MenuPrincipal;