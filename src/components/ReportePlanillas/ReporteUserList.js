import React, { useEffect } from 'react'
import '../Comunes/styles/user.css'
import ReporteUserItem from './ReporteUserItem'

const ReporteUserList = ({ users, foundUsers, handleViewUser, view, notData }) => {
  return (
    <div className='user-list-container'>
      {
        notData ? <p className='message'>No se encontraron resultados...</p> :
        foundUsers.length != 0 ?
          foundUsers.map((fuser, i) => (
            <ReporteUserItem key={i} view={view} user={fuser} handleViewUser={() => handleViewUser(fuser.idUsuario)} ></ReporteUserItem>
          ))
          :
          users.map((user, i) => (
            <ReporteUserItem key={i} view={view} user={user} handleViewUser={() => handleViewUser(user.idUsuario)} ></ReporteUserItem>
          ))
      }
    </div>
  )
}

export default ReporteUserList
