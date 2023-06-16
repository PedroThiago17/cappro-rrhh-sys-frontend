import { Delete, Edit, Visibility } from '@material-ui/icons'
import axios from 'axios';
import React, { useState } from 'react'
import { downloadPdf } from '../../utils/utils';
import PageLoader from '../Loading';

const ReporteTable = ({ foundUsers, users, headers, children = null, notData }) => {

  const [loading, setLoading] = useState(false);

  const download = async (planillaId, dni) => {
    try {
      setLoading(true)
      await downloadPdf(planillaId, dni);
      setLoading(false)

    } catch (error) {
      console.error('Error al descargar el archivo:', error);
    }
  };

  return (
    <div className='table-container'>
      <div className='rp-table-header'>
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
                foundUsers.map((fu, index) => (
                  <div key={index} className='rp-table-content'>
                    <p>{fu.anioVigencia}</p>
                    <p>{fu.mesVigencia}</p>
                    <p>{fu.dni}</p>
                    <p>{fu.nombres}</p>
                    <p>{fu.apellidos}</p>
                    {
                      loading ?
                        <PageLoader /> :
                        <div className='mp-buttons-container' style={{ cursor: 'pointer' }} onClick={() => download(fu.idPlanilla, fu.dni)}>
                          <img src='./images/Recurso8.png' />
                        </div>
                    }
                  </div>
                ))
                :
                users.map((user, index) => (
                  <div key={index} className='rp-table-content'>
                    <p>{user.anioVigencia}</p>
                    <p>{user.mesVigencia}</p>
                    <p>{user.dni}</p>
                    <p>{user.nombres}</p>
                    <p>{user.apellidos}</p>
                    {
                      loading ?
                        <PageLoader /> :
                        <div className='mp-buttons-container' style={{ cursor: 'pointer' }} onClick={() => download(user.idPlanilla, user.dni)}>
                          <img src='./images/Recurso8.png' />
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

export default ReporteTable
