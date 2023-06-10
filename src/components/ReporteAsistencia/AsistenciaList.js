import React, { useEffect } from 'react'
import '../Comunes/styles/user.css'
import AsistenciaUserItem from './AsistenciaUserItem'

const AsistenciaList = ({ user, asistenciaData, foundUsers, handleViewUser, view, notData }) => {

  return (
    <div className='user-list-container'>
      {
        notData ? <p className='message'>No se encontraron resultados...</p> :
/*         foundUsers.length != 0 ?
          foundUsers.map((fuser, i) => (
            <AsistenciaUserItem key={i} view={view} user={user} asistenciaData={asis} handleViewUser={() => handleViewUser(fuser.idUsuario)} />
          ))
          : */
          asistenciaData.map((asis, i) => (
            <AsistenciaUserItem key={i} view={view} user={user} asistenciaData={asis} handleViewUser={() => handleViewUser(user.idUsuario)} />
          ))
      }
    </div>
  )
}

export default AsistenciaList