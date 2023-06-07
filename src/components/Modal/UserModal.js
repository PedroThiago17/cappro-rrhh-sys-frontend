import React, { useEffect, useState } from 'react'
import './styles/styles.css'
import axios from 'axios';
import { JUBILACION, MULTIPLICADOR, PORCENTAJE, VALOR_TIEMPO_COMPLETO, VALOR_TIEMPO_PARCIAL } from '../../constants/constants';
import { calcularAñoJubilacion, calcularEdad } from '../../utils/utils';

const UserModal = ({ setShowModal, selectedId }) => {

  const [user, setUser] = useState({
    correo: '',
    datosLaborales: {},
    datosPersonales: {},
    datosPlanilla: {},
    idUsuario: 0,
    rol: ''
  })
  const [modalidadHoraria, setModalidadHoraria] = useState('');
  const [cargaHoraria, setCargaHoraria] = useState('');
  const [fondoPensiones, setFondoPensiones] = useState('');
  const [pagoBruto, setPagoBruto] = useState('');
  const [dsctoSalud, setDsctoSalud] = useState('');
  const [dsctoPension, setDsctoPension] = useState('');
  const [supervisor, setSupervisor] = useState('');
  const [pagoNeto, setPagoNeto] = useState('');
  const [afp, setAfp] = useState('');
  const [edad, setEdad] = useState('');
  const [añoJub, setAñoJub] = useState('');


  const toggleModal = () => {
    setShowModal(false);
  };
  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(`https://cappro-rrhh-sys.azurewebsites.net/usuario/findById/${selectedId}`)
      if (res.data) {
        console.log(res.data)
        const { datosPlanilla, datosPersonales, usuarioSupervisor } = res.data;
        if (usuarioSupervisor !== null) {
          setSupervisor(usuarioSupervisor.datosPersonales.nombres + ' ' + usuarioSupervisor.datosPersonales.apellidos);
        }
        const edad = calcularEdad(datosPersonales.fnacimiento);
        const añoJubilacion = edad > JUBILACION ? new Date().getFullYear() : (JUBILACION - edad) + new Date().getFullYear();
        setAñoJub(añoJubilacion)
        setEdad(edad)
        setUser(res.data)
        setModalidadHoraria(datosPlanilla.idDomModalidad === 5 ? 'Tiempo Completo' : 'Tiempo Parcial');
        const cargaHoraria = datosPlanilla.idDomModalidad === 5 ? VALOR_TIEMPO_COMPLETO : VALOR_TIEMPO_PARCIAL;
        setCargaHoraria(cargaHoraria);

        const resFondoP = await axios.get('https://cappro-rrhh-sys.azurewebsites.net/dominios/getDominiosPorCodigo/C_FONDO_PENSIONES');

        const pensionId = datosPlanilla.idDomFondpPen;
        const tipoPension = resFondoP.data.find((e) => e.idDominio === pensionId);
        setFondoPensiones(tipoPension.valCadDominio);

        const pagoB = ((cargaHoraria * datosPlanilla.pagoHora) * MULTIPLICADOR);
        setPagoBruto(pagoB);
        const desctoSalud = (pagoB * PORCENTAJE).toFixed(2);
        setDsctoSalud(Number(desctoSalud));

        if (tipoPension.valCadDominio === 'AFP') {
          const afpId = datosPlanilla.idDomAfp;
          const resAfp = await axios.get('https://cappro-rrhh-sys.azurewebsites.net/dominios/getDominiosPorCodigo/C_AFP')

          const afpType = resAfp.data.find((e) => e.idDominio === afpId);
          const afpValue = afpType.valDecDominio / 100;
          setAfp(afpType.valCadDominio);
          const desctoPension = (pagoB * afpValue).toFixed(2);

          setDsctoPension(desctoPension)

          const pagoNeto = pagoB - (Number(desctoPension) + Number(desctoSalud))
          setPagoNeto(pagoNeto)

        } else {
          const onpValue = tipoPension.valDecDominio / 100;
          const desctoPension = (pagoB * onpValue).toFixed(2);
          setDsctoPension(desctoPension)

          const pagoNeto = pagoB - (Number(desctoPension) + Number(desctoSalud))
          setPagoNeto(pagoNeto)

        }
      }
    }
    getUser();
  }, [])

  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className='h2-title'>DATOS DE USUARIO</h2>
        <div className='blocks-container'>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div className='block-title-container'>
              <p className='block-title'>Datos personales</p>
              <div className='line'></div>
            </div>
            <div className='form-content'>
              <div className='form-block-modal'>
                <div className='input-container'>
                  <label htmlFor="">DNI:</label>
                  <input name='dni' type='number' readOnly defaultValue={user.datosPersonales.dni} />
                </div>
                <div className='input-container'>
                  <label htmlFor="">Lugar de nacimiento:</label>
                  <input name='lnacimiento' type='text' readOnly defaultValue={user.datosPersonales.lnacimiento} />
                </div>
                <div className='input-container'>
                  <label>Dirección:</label>
                  <input name='direccion' type='text' readOnly defaultValue={user.datosPersonales.direccion} />
                </div>
              </div>
              <div className='form-block-modal'>
                <div className='input-container'>
                  <label>Nombres:</label>
                  <input name='nombres' type='text' readOnly defaultValue={user.datosPersonales.nombres} />
                </div>
                <div className='input-container'>
                  <label htmlFor=""> Edad: </label>
                  <input type='number' id='edad' readOnly defaultValue={edad} />
                </div>
                <div className='input-container'>
                  <label htmlFor="">Teléfono / Celular:</label>
                  <input name='telefono' type='text' readOnly defaultValue={user.datosPersonales.telefono} />
                </div>
              </div>
              <div className='form-block-modal'>
                <div className='input-container'>
                  <label>Apellidos:</label>
                  <input name='apellidos' type='text' readOnly defaultValue={user.datosPersonales.apellidos} />
                </div>
                <div className='input-container'>
                  <label htmlFor=""> Sexo: </label>
                  <input name='apellidos' type='text' readOnly defaultValue={user.datosPersonales.sexo} />
                </div>
                <div className='input-container'>
                  <label htmlFor=""> Correo personal: </label>
                  <input title={user.correo} type='email' name='email' readOnly defaultValue={user.correo} />
                </div>
              </div>
              <div className='form-block-modal'>
                <div className='input-container'>
                  <label htmlFor=""> Fecha de nacimiento: </label>
                  <input type='date' id='fechaNacimiento' readOnly defaultValue={user.datosPersonales.fnacimiento} />
                </div>
                <div className='input-container'>
                  <label htmlFor=""> Estado civil: </label>
                  <input name='apellidos' type='text' readOnly defaultValue={user.datosPersonales.estadoCivil} />
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div className='block-title-container'>
              <p className='block-title'>Datos laborales</p>
              <div className='line'></div>
            </div>
            <div className='form-content'>
              <div className='form-block-modal'>
                <div className='input-container'>
                  <label htmlFor=""> Fecha de Ingreso: </label>
                  <input type='date' readOnly defaultValue={user.datosLaborales.fingreso} />
                </div>
                <div className='input-container'>
                  <label>Universidad/ Institución:</label>
                  <input name='universidad' type='text' readOnly defaultValue={user.datosLaborales.universidad} />
                </div>
              </div>
              <div className='form-block-modal'>
                <div className='input-container'>
                  <label htmlFor="">Años de experiencia:</label>
                  <input name='experiencia' type='number' readOnly defaultValue={user.datosLaborales.aniosExpe} />
                </div>
                <div className='input-container'>
                  <label>Especialidad:</label>
                  <input name='especialidad' type='text' readOnly defaultValue={user.datosLaborales.especialidad} />
                </div>
              </div>
              <div className='form-block-modal'>
                <div className='input-container'>
                  <label htmlFor=""> Año de jubilación: </label>
                  <input type='number' readOnly defaultValue={añoJub} />
                </div>
                <div className='input-container'>
                  <label htmlFor=""> Puesto: </label>
                  <input name='puesto' type='text' readOnly defaultValue={user.rol} />
                </div>
              </div>
              <div className='form-block-modal'>
                <div className='input-container'>
                  <label>Formación profesional:</label>
                  <input name='formacion' type='text' readOnly defaultValue={user.datosLaborales.formacion} />
                </div>
                {
                  supervisor &&
                  <div className='input-container'>
                    <label>Supervision:</label>
                    <input name='supervision' type='text' readOnly defaultValue={supervisor} />
                  </div>
                }
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div className='block-title-container'>
              <p className='block-title'>Datos de planilla</p>
              <div className='line'></div>
            </div>
            <div className='form-content'>
              <div className='form-block-modal'>
                <div className='input-container'>
                  <label htmlFor="">Código modular:</label>
                  <input name='codigoModular' type='text' readOnly defaultValue={user.datosPlanilla.codModular} />
                </div>
                <div className='input-container'>
                  <label htmlFor=""> Pago bruto: </label>
                  <input type='number' readOnly required defaultValue={pagoBruto} />
                </div>
                <div className='input-container'>
                  <label htmlFor=""> Descuento de pensiones: </label>
                  <input type='number' step="any" readOnly defaultValue={dsctoPension} />
                </div>
              </div>
              <div className='form-block-modal'>
                <div className='input-container'>
                  <label htmlFor=""> Modalidad horaria: </label>
                  <input name='modalidadHoraria' type='text' readOnly defaultValue={modalidadHoraria} />
                </div>

                <div className='input-container'>
                  <label htmlFor=""> Descuento seguro de salud: </label>
                  <input type='number' readOnly step="any" defaultValue={dsctoSalud} />
                </div>
                <div className='input-container'>
                  <label htmlFor=""> Pago neto: </label>
                  <input type='number' id='pagoNeto' readOnly step="any" defaultValue={pagoNeto} />
                </div>
              </div>
              <div className='form-block-modal'>
                <div className='input-container'>
                  <label htmlFor=""> Carga horaria: </label>
                  <input type='text' id='cargaHoraria' readOnly defaultValue={cargaHoraria} />
                </div>
                <div className='input-container'>
                  <label htmlFor=""> Fondo de pensiones: </label>
                  <input type='text' id='fondoPensiones' readOnly defaultValue={fondoPensiones} />
                </div>

              </div>
              <div className='form-block-modal'>
                <div className='input-container'>
                  <label htmlFor=""> Pago por hora: </label>
                  <input type='number' id='pagoPorHora' step="any" min={0} readOnly defaultValue={user.datosPlanilla.pagoHora} />
                </div>
                {
                  fondoPensiones === 'AFP' &&
                  <div className='input-container'>
                    <label> AFP: </label>
                    <input type='text' id='fondoAfp' readOnly defaultValue={afp} />
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
        <button className="main-button" onClick={toggleModal} style={{padding:'12px 12px',fontSize:'17px',margin:'20px'}}>
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default UserModal
