import { Delete, Edit, Visibility } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import { downloadPdf } from '../../utils/utils';
import PageLoader from '../Loading';

const ReporteUserItem = ({ user, handleViewUser, view = null }) => {

  const { anioVigencia, mesVigencia, nombres, apellidos, dni, idPlanilla } = user;
  const [loading, setLoading] = useState(false);

  const download = async () => {
    try {
      setLoading(true)
      await downloadPdf(idPlanilla, dni);
      setLoading(false)
    } catch (error) {
      console.error('Error al descargar el archivo:', error);
    }
  };

  return (
    <div className='user-item-container'>
      <div className='user-detail-container'>
        <div className='user-name'>
          <p className='user-detail'>{nombres} </p>
          <p className='user-detail'>{apellidos}</p>
          <p className='user-detail'>{anioVigencia}</p>
        </div>
        <div className='user-other-info'>
          <div>
            <p className='user-detail'>DNI: </p>
            <p className=''>{dni}</p>
          </div>
          <div>
            <p className='user-detail'>Mes: </p>
            <p>{mesVigencia}</p>
          </div>
        </div>
      </div>
      {
        view === 'Reporte Planillas' ?
          loading ?
            <PageLoader></PageLoader> :
            <div className='mp-buttons-container' style={{ cursor: 'pointer' }} onClick={download}>
              <img src='./images/Recurso8.png' />
            </div>
          :
          view === 'Reporte Asistencia' ? null
            :
            <div className='mp-buttons-container'>
              <Visibility style={{ cursor: 'pointer' }} onClick={handleViewUser} />
              <Edit style={{ cursor: 'pointer' }} />
              <Delete style={{ cursor: 'pointer', color: 'red' }} />
            </div>
      }

    </div>
  )
}

export default ReporteUserItem
