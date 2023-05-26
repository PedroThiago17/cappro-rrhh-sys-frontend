import React, { useEffect, useState } from 'react'
import './styles/delete.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { JUBILACION, PORCENTAJE, VALOR_TIEMPO_COMPLETO, VALOR_TIEMPO_PARCIAL } from '../../constants/constants';
import { calcularAñoJubilacion, calcularEdad } from '../../utils/utils';



const DeleteModal = ({ setShowDeleteModal, userToDelete }) => {

  const { idUsuario, datosPersonales } = userToDelete;
  const navigate = useNavigate();
  const onSubmit = (url) => {
    navigate(url);
  }
  const disableUser = async () => {
    const { data } = await axios.put(`https://cappro-rrhh-sys.azurewebsites.net/usuario/desactivacionUsuario/${idUsuario}`);
    console.log('user ', userToDelete)
    setShowDeleteModal(false);
    window.location.reload();
  }
  return (
    <div className="modal">
      <div className="delete-modal-content">
        <div className='modal-info'>
          {`¿Seguro que desea desactivar a`}
          <p> {`${datosPersonales.nombres} ${datosPersonales.apellidos} ?`}</p>
        </div>
        <div className='modal-buttons'>
          <button className='main-button' style={{ backgroundColor: '#c5c5c5' }} type='button' onClick={() => setShowDeleteModal(false)}> Cancelar </button>
          <button className='main-button' type='button' onClick={disableUser}> Confirmar </button>
        </div>

      </div>
    </div>
  );
}

export default DeleteModal
