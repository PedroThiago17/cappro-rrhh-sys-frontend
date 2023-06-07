import { Delete, Edit, Visibility } from '@material-ui/icons'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './styles/styles.css'
const AsistenciaTable = ({ foundUsers, user, asistenciaData , headers, handleViewUser = null, view = null, notData }) => {


  return (
    <div className='table-container'>
      <div className='ra-table-header'>
        {
          headers.map((header, i) => (
            <p key={i}>{header}</p>
          ))
        }
      </div>
      {
        notData ? <p className='message'>No se encontraron resultados...</p> :
          <div className='table-content-container'>
            {
/*               foundUsers.length != 0 ?
                foundUsers.map(({ idUsuario, datosPersonales, datosPlanilla, datosLaborales }, index) => (
                  <div key={index} className='ra-table-content'>
                    <p>{users.dni}</p>
                    <p>{users.nombres}</p>
                    <p>{users.apellidos}</p>
                    <p>{users.fechaRegistro}</p>
                    <p>{users.horaEntrada}</p>
                    <p>{users.horaSalida}</p>
                  </div>
                ))
                : */
                asistenciaData.map(({fechaRegistro,horaEntrada, horaSalida }, index) => (
                  <div key={index} className='ra-table-content'>
                    <p>{user.dni}</p>
                    <p>{user.nombres}</p>
                    <p>{user.apellidos}</p>
                    <p>{fechaRegistro}</p>
                    <p>{horaEntrada}</p>
                    <p>{horaSalida}</p>
                  </div>
                ))
            }
          </div>
      }
    </div>
  )
}

export default AsistenciaTable
