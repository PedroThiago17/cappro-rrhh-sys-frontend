import { Delete, Edit, Visibility } from '@material-ui/icons';
import React, { useEffect } from 'react'

const UserItem = ({ user, handleViewUser, handleDelete, view = null, userRol }) => {


  const { datosPersonales, datosPlanilla, idUsuario } = user;
  return (
    <div className='user-item-container'>
      <div className='user-detail-container'>
        <div className='user-name'>
          <p className='user-detail'>{datosPersonales.nombres} </p>
          <p className='user-detail'>{datosPersonales.apellidos}</p>
        </div>
        <div className='user-other-info'>
          <div>
            <p className='user-detail'>DNI: </p>
            <p className=''>{datosPersonales.dni}</p>
          </div>
          <div>
            <p className='user-detail'>Código Modular: </p>
            <p>{datosPlanilla.codModular}</p>
          </div>
        </div>
      </div>
      {
        view === 'Reporte Planillas' ?
          <div className='mp-buttons-container'>
            <img src='./images/Recurso8.png' />
          </div>
          :
          view === 'Reporte Asistencia' ? null
            :
            <div className='mp-buttons-container'>
              <Visibility style={{ cursor: 'pointer' }} onClick={handleViewUser} />
              {
                userRol !== 'Supervisor' &&
                <>
                  <Edit style={{ cursor: 'pointer' }} />
                  <Delete style={{ cursor: 'pointer', color: 'red' }} onClick={() => handleDelete(user)} />
                </>
              }
            </div>
      }

    </div>
  )
}

export default UserItem
