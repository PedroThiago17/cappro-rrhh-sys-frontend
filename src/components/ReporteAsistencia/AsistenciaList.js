import React, { useEffect } from 'react'
import '../Comunes/styles/user.css'
import AsistenciaUserItem from './AsistenciaUserItem'

const AsistenciaList = ({ asistenciaData, foundUsers, notData }) => {

  return (
    <div className='user-list-container'>
      {
        notData ? <p className='message'>No se encontraron resultados...</p> :
        foundUsers.length != 0 ?
          foundUsers.map((fuser, i) => (
            <AsistenciaUserItem key={i}  asistenciaData={fuser}/>
          ))
          :
          asistenciaData.map((asis, i) => (
            <AsistenciaUserItem key={i}   asistenciaData={asis} />
          ))
      }
    </div>
  )
}

export default AsistenciaList
