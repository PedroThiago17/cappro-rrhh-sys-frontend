import { Delete, Edit, Visibility } from '@material-ui/icons';
import React, { useEffect } from 'react'

const AsistenciaUserItem = ({ asistenciaData}) => {


  /* const { datosPersonales, datosPlanilla, datosLaborales } = user; */

  return (
    <div className='user-item-container'>
      <div className='user-detail-container'>
        <div className='user-name'>
          <p className='user-detail'>{asistenciaData.nombres} </p>
          <p className='user-detail'>{asistenciaData.apellidos}</p>
        </div>
        <div className='user-other-info'>
          <div>
            <p className='user-detail'>DNI: </p>
            <p className=''>{asistenciaData.dni}</p>
          </div>
          <div>
            <p className='user-detail'>Fecha de ingreso: </p>
            <p>{asistenciaData.fechaRegistro}</p>
          </div>
        </div>
        <div className='user-other-info'>
          <div>
            <p className='user-detail'>Entrada: </p>
            <p className=''>{asistenciaData.horaEntrada}</p>
          </div>
          <div>
            <p className='user-detail'>Salida: </p>
            <p className=''>{asistenciaData.horaSalida}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AsistenciaUserItem
