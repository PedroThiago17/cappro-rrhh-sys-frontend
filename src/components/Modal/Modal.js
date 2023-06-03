import React, { useEffect, useState } from 'react'
import './styles/delete.css'
import axios from 'axios';
import { JUBILACION, PORCENTAJE, VALOR_TIEMPO_COMPLETO, VALOR_TIEMPO_PARCIAL } from '../../constants/constants';
import { calcularAñoJubilacion, calcularEdad } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';
import { AiOutlineCopy } from 'react-icons/ai'
import './styles/modal.css'


const Modal = ({ setShowModal, children }) => {

  return (
    <div className="modal">
      <div className="modal-content">
        {
          children
        }
        <div className='modal-buttons'>
          <button className='main-button' type='button' onClick={() => setShowModal(false)} style={{margin:'5px', padding:'15px'}}> Cerrar </button>
        </div>
      </div>
    </div>
  );
}

export default Modal
