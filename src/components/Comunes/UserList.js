import React, { useEffect } from 'react'
import UserItem from './UserItem'
import './styles/user.css'

const UserList = ({ users, foundUsers, handleViewUser, handleDelete, view, notData, userRol }) => {

  return (
    <div className='user-list-container'>
      {
        notData ? <p className='message'>No se encontraron resultados...</p> :
          foundUsers.length != 0 ?
            foundUsers.map((fuser, i) => (
              <UserItem key={i} view={view} user={fuser} h
                andleViewUser={() => handleViewUser(fuser.idUsuario)}
                handleDelete={handleDelete}
                userRol= {userRol}
              ></UserItem>
            ))
            :
            users.map((user, i) => (
              <UserItem key={i} view={view} user={user}
                handleViewUser={() => handleViewUser(user.idUsuario)}
                handleDelete={handleDelete}
                userRol = {userRol}
              ></UserItem>
            ))
      }
    </div>
  )
}

export default UserList
