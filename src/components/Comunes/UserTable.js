import { Delete, Edit, Visibility } from '@material-ui/icons'
import React, { useEffect } from 'react'

const UserTable = ({ foundUsers, users, headers, handleViewUser = null,handleVEditUser = null, handleDelete, view = null, notData, userRol }) => {

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
                foundUsers.map(({ idUsuario, datosPersonales, datosPlanilla, rol }, index) => (
                  <div key={index} className='table-content'>
                    <p>{datosPersonales.dni}</p>
                    <p>{datosPersonales.nombres}</p>
                    <p>{datosPersonales.apellidos}</p>
                    <p>{datosPlanilla.codModular}</p>
                    <p>{rol}</p>
                    {
                      view === 'Mantenimiento Personal' &&
                      <div className='mp-buttons-container'>
                        <Visibility style={{ cursor: 'pointer' }} onClick={() => handleViewUser(idUsuario)} />
                        {
                          userRol !== 'Supervisor' &&
                          <>
                            <Edit style={{ cursor: 'pointer' }} onClick={() => handleVEditUser(idUsuario)} />
                            <Delete style={{ cursor: 'pointer', color: 'red' }} onClick={() => handleDelete({ idUsuario, datosPersonales })} />
                          </>
                        }

                      </div>
                    }
                  </div>
                ))
                :
                users.map(({ idUsuario, datosPersonales, datosPlanilla, rol }, index) => (
                  <div key={index} className='table-content'>
                    <p>{datosPersonales.dni}</p>
                    <p>{datosPersonales.nombres}</p>
                    <p>{datosPersonales.apellidos}</p>
                    <p>{datosPlanilla.codModular}</p>
                    <p>{rol}</p>
                    {
                      view === 'Mantenimiento Personal' &&
                      <div className='mp-buttons-container'>
                        <Visibility style={{ cursor: 'pointer' }} onClick={() => handleViewUser(idUsuario)} />
                        {
                          userRol !== 'Supervisor' &&
                          <>
                            <Edit style={{ cursor: 'pointer' }} onClick={() => handleVEditUser(idUsuario)} />
                            <Delete style={{ cursor: 'pointer', color: 'red' }} onClick={() => handleDelete({ idUsuario, datosPersonales })} />
                          </>
                        }
                      </div>
                    }

                  </div>
                ))
            }
          </div>
      }
    </div>
  )
}

export default UserTable
