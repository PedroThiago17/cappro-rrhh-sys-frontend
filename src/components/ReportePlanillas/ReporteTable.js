import { Delete, Edit, Visibility } from '@material-ui/icons'
import React from 'react'

const ReporteTable = ({ foundUsers, users, headers, children = null}) => {
  return (
    <div className='table-container'>
      <div className='rp-table-header'>
        {
          headers.map((header, i) => (
            <p key={i}>{header}</p>
          ))
        }
      </div>
      <div className='table-content-container'>
        {
          foundUsers.length != 0 ?
            foundUsers.map(({ datosPersonales, datosPlanilla }, index) => (
              <div key={index} className='rp-table-content'>
                <p>{datosPersonales.dni}</p>
                <p>{datosPersonales.nombres}</p>
                <p>{datosPersonales.apellidos}</p>
                <p>{datosPlanilla.codModular}</p>
                {children}
              </div>
            ))
            :
            users.map(({ datosPersonales, datosPlanilla }, index) => (
              <div key={index} className='rp-table-content'>
                <p>Enero</p>
                <p>2023</p>
                <p>{datosPersonales.dni}</p>
                <p>{datosPersonales.nombres}</p>
                <p>{datosPersonales.apellidos}</p>
                {children}
              </div>
            ))
        }
      </div>
    </div>
  )
}

export default ReporteTable
