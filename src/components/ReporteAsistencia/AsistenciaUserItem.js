import { Delete, Edit, Visibility } from '@material-ui/icons';
import React, { useEffect } from 'react'

const AsistenciaUserItem = ({ user, handleViewUser, view = null }) => {


  const { datosPersonales, datosPlanilla, datosLaborales } = user;
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
            <p className='user-detail'>Fecha de ingreso: </p>
            <p>{datosLaborales.fingreso}</p>
          </div>
        </div>
        <div className='user-other-info'>
          <div>
            <p className='user-detail'>Tipo: </p>
            <p className=''>{datosPersonales.estadoCivil}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AsistenciaUserItem
