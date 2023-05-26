import React, { useEffect } from 'react'
import '../Comunes/styles/user.css'
import AsistenciaUserItem from './AsistenciaUserItem'

const AsistenciaList = ({ users, foundUsers, handleViewUser, view, keys }) => {

  return (
    <div className='user-list-container'>
      {
        foundUsers.length != 0 ?
          foundUsers.map((fuser, i) => (
            <AsistenciaUserItem key={i} view={view} user={fuser} handleViewUser={() => handleViewUser(fuser.idUsuario)} />
          ))
          :
          users.map((user, i) => (
            <AsistenciaUserItem key={i} view={view} user={user} handleViewUser={() => handleViewUser(user.idUsuario)} />
          ))
      }
    </div>
  )
}

export default AsistenciaList
