import React, { useEffect } from 'react'
import UserItem from './UserItem'
import './styles/user.css'

const UserList = ({ users, foundUsers, handleViewUser, handleDelete, view, keys }) => {

  return (
    <div className='user-list-container'>
      {
        foundUsers.length != 0 ?
          foundUsers.map((fuser, i) => (
            <UserItem key={i} view={view} user={fuser} h
            andleViewUser={() => handleViewUser(fuser.idUsuario)} 
            handleDelete={handleDelete}
            
            ></UserItem>
          ))
          :
          users.map((user, i) => (
            <UserItem key={i} view={view} user={user} 
            handleViewUser={() => handleViewUser(user.idUsuario)} 
            handleDelete={handleDelete}

            ></UserItem>
          ))
      }
    </div>
  )
}

export default UserList
