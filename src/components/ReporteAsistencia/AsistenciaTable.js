import { Delete, Edit, Visibility } from '@material-ui/icons'
import React, { useEffect } from 'react'

const AsistenciaTable = ({ foundUsers, users, headers, handleViewUser = null, view = null, notData }) => {

  return (
    <div className='table-container'>
      <div className='table-header'>
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
              foundUsers.length != 0 ?
                foundUsers.map(({ idUsuario, datosPersonales, datosPlanilla, datosLaborales }, index) => (
                  <div key={index} className='table-content'>
                    <p>{datosPersonales.dni}</p>
                    <p>{datosPersonales.nombres}</p>
                    <p>{datosPersonales.apellidos}</p>
                    <p>{datosLaborales.fingreso}</p>
                    <p>{datosPersonales.estadoCivil}</p>

                  </div>
                ))
                :
                users.map(({ idUsuario, datosPersonales, datosPlanilla, datosLaborales }, index) => (
                  <div key={index} className='table-content'>
                    <p>{datosPersonales.dni}</p>
                    <p>{datosPersonales.nombres}</p>
                    <p>{datosPersonales.apellidos}</p>
                    <p>{datosLaborales.fingreso}</p>
                    <p>{datosPersonales.estadoCivil}</p>
                  </div>
                ))
            }
          </div>
      }
    </div>
  )
}

export default AsistenciaTable
