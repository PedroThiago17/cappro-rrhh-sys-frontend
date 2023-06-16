import React, { useEffect, useState } from 'react'
import './styles/modal.css'


const Modal = ({ setShowModal, children }) => {

  return (
    <div className="modal">
      <div className="modal-content-1">
        {
          children
        }
        <div className='modal-buttons'>
          <button className='main-button' type='button' onClick={() => setShowModal(false)} style={{padding:'12px 10px', fontSize:'18px', margin:'10px'}}> Cerrar </button>
        </div>
      </div>
    </div>
  );
}

export default Modal