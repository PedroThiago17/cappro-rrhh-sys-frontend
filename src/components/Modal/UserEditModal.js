import React, { useEffect, useRef, useState } from 'react'
import './styles/styles.css'
import axios from 'axios';
import { INITIAL_FONDO_PENSIONES, JUBILACION, MULTIPLICADOR, PORCENTAJE, VALOR_TIEMPO_COMPLETO, VALOR_TIEMPO_PARCIAL, estadoCivilOptions, fondoAfpOptions, fondoPensionesOptions } from '../../constants/constants';
import { calcularAñoJubilacion, calcularEdad } from '../../utils/utils';

const UserEditModal = ({ setShowEditModal, selectedId }) => {

  const [user, setUser] = useState({
    correo: '',
    datosLaborales: {},
    datosPersonales: {},
    datosPlanilla: {},
    idUsuario: 0,
    rol: '',
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
  const [rol, setRol] = useState('');
  const [añoJub, setAñoJub] = useState('');
  const [porcentajePension, setPorcentajePension] = useState(0);
  const [afpOptions, setAfpOptions] = useState([]);
  const [modalidadHorariaOptions, setModalidadHorariaOptions] = useState([]);


  const [fondoPensionesList, setFondoPensionesList] = useState(INITIAL_FONDO_PENSIONES);

  const refEstadoCivil = useRef(null);
  const refFondoPensiones = useRef(null);
  const refPuesto = useRef(null);
  const refFondoAfp = useRef(null);

  useEffect(() => {
    refEstadoCivil.current.value = user.datosPersonales.estadoCivil;
  }, []); // 

  useEffect(() => {
    if (cargaHoraria && user.datosPlanilla.pagoHora) {

      const pagoBruto = (Number(cargaHoraria) * Number(user.datosPlanilla.pagoHora)*MULTIPLICADOR);

      setPagoBruto(pagoBruto)
    }
  }, [cargaHoraria, user.datosPlanilla.pagoHora]);

  useEffect(() => {
    if (pagoBruto) {
      const dsctoSalud = Number(pagoBruto) * PORCENTAJE;

      setDsctoSalud(dsctoSalud)
    }
  }, [pagoBruto]);

  useEffect(() => {
    const dsctoPension = Number(pagoBruto) * porcentajePension;

    setDsctoPension(dsctoPension)
  }, [porcentajePension, pagoBruto]);

  useEffect(() => {
    const pagoNeto = Number(pagoBruto) - (Number(dsctoSalud) + Number(dsctoPension))
    setPagoNeto(pagoNeto)
  }, [dsctoSalud, dsctoPension]);

  const handleOnChange = async (e) => {

    const fieldName = e.target.name;
    let fieldValue = e.target.value;
    let rolValue = undefined


    const [parentKey, childKey] = fieldName.split('.');

    
    if (e.target.options && childKey === 'idDomModalidad') {

      setModalidadHoraria(fieldValue)
      if (fieldValue === 'Tiempo Completo') {
        setCargaHoraria(VALOR_TIEMPO_COMPLETO)
      }
      else {
        setCargaHoraria(VALOR_TIEMPO_PARCIAL)
      }
      return;
    }

    if (e.target.options && parentKey === 'rol') {
      rolValue = fieldValue
    }

    if (e.target.options && childKey === 'idDomFondpPen') {

      const idDomFondpPen = e.target.options[e.target.selectedIndex].id

      if (fieldValue === 'AFP') setFondoPensiones('AFP')
      else {
        setFondoPensiones('ONP')
        const { data } = await axios.get('https://cappro-rrhh-sys.azurewebsites.net/dominios/getDominiosPorCodigo/C_FONDO_PENSIONES');

        const fondoOnp = data.find(e => e.idDominio === Number(idDomFondpPen))
        setPorcentajePension(fondoOnp.valDecDominio / 100);

        const dsctoPension = Number(pagoBruto) * (fondoOnp.valDecDominio / 100)
        const pagoNeto = pagoBruto - (Number(dsctoSalud) + dsctoPension)
        setDsctoPension(dsctoPension)
        setPagoNeto(pagoNeto.toFixed(2))
      }

      fieldValue = Number(idDomFondpPen);
    }

    if (e.target.options && childKey === 'idDomAfp') {
      const afpId = e.target.options[e.target.selectedIndex].id

      const { data } = await axios.get(`https://cappro-rrhh-sys.azurewebsites.net/dominios/getDominiosPorCodigo/C_AFP`);

      const fondoAfp = data.find(e => e.idDominio === Number(afpId))


      if (fondoAfp) {
        setPorcentajePension(fondoAfp.valDecDominio / 100);
        const dsctoPension = Number(pagoBruto) * (fondoAfp.valDecDominio / 100)
        const pagoNeto = pagoBruto - (Number(dsctoSalud) + dsctoPension)
        setDsctoPension(dsctoPension)
        setPagoNeto(pagoNeto.toFixed(2))
      }
      fieldValue = Number(afpId);
    }

    if (childKey === 'telefono') {
      fieldValue = fieldValue.replace(/[^0-9]/g, '').substring(0, 9);
    }

    setUser((prevState) => ({
      ...prevState,
      [parentKey]: {
        ...prevState[parentKey],
        [childKey]: fieldValue
      },
      rol: rolValue ? rolValue : prevState.rol
    }));

  };

  const test = {
    "cargaHoraria": 24,
    "direccion": "test",
    "estadoCivil": "S",
    "idDomAfp": null,
    "idDomFondpPen": 6,
    "idDomModalidad": 4,
    "idUsuario": 3,
    "pagoHora": 40,
    "telefono": "111111111"
  }

  const saveEdit = async () => {

    const { datosPersonales, datosPlanilla, idUsuario } = user;

    if (refFondoAfp.current && refFondoAfp.current.value === 'Seleccionar') {
      return;
    }
    const idDomAfp = datosPlanilla.idDomFondpPen === 6 ? null : datosPlanilla.idDomAfp

    const userEdited = {
      cargaHoraria: cargaHoraria,
      direccion: datosPersonales.direccion,
      estadoCivil: datosPersonales.estadoCivil,
      idDomAfp,
      idDomFondpPen: datosPlanilla.idDomFondpPen,
      idDomModalidad: modalidadHoraria === 'Tiempo Completo' ? 5 : 4,
      idUsuario,
      telefono: datosPersonales.telefono,
      pagoHora: Number(datosPlanilla.pagoHora)
    }

    try {
      const {data} = await axios.put("https://cappro-rrhh-sys.azurewebsites.net/usuario/updateUsuario", userEdited)
      if(data) {
        console.log('data editada: ', data)
        setShowEditModal(false);
        alert("El usuario fue editado de manera correcta.")
      }

    } catch (error) {
      console.log(error)
    }

   /*  console.log('full user: ', user)
    console.log('user edited: ', userEdited) */
  }
  const toggleModal = () => {
    setShowEditModal(false);
  };
  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(`https://cappro-rrhh-sys.azurewebsites.net/usuario/findById/${selectedId}`)
      if (res.data) {

        const { datosPlanilla, datosPersonales, usuarioSupervisor, rol } = res.data;
        setRol(rol);

        if (usuarioSupervisor !== null) {
          setSupervisor(usuarioSupervisor.datosPersonales.nombres + ' ' + usuarioSupervisor.datosPersonales.apellidos);
        }
        const edad = calcularEdad(datosPersonales.fnacimiento);
        const añoJubilacion = edad > JUBILACION ? new Date().getFullYear() : (JUBILACION - edad) + new Date().getFullYear();
        setAñoJub(añoJubilacion)
        setEdad(edad)
        setUser(res.data)

        if (refEstadoCivil.current) {
          const estadoCivilInicial = res.data.datosPersonales.estadoCivil;
          refEstadoCivil.current.value = estadoCivilInicial;
        }
        setModalidadHoraria(datosPlanilla.idDomModalidad === 5 ? 'Tiempo Completo' : 'Tiempo Parcial');
        const cargaHoraria = datosPlanilla.idDomModalidad === 5 ? VALOR_TIEMPO_COMPLETO : VALOR_TIEMPO_PARCIAL;
        setCargaHoraria(cargaHoraria);

        const resFondoP = await axios.get('https://cappro-rrhh-sys.azurewebsites.net/dominios/getDominiosPorCodigo/C_FONDO_PENSIONES');

        setFondoPensionesList(resFondoP.data)

        const pensionId = datosPlanilla.idDomFondpPen;
        const tipoPension = resFondoP.data.find((e) => e.idDominio === pensionId);
        setFondoPensiones(tipoPension.valCadDominio);

        if (refFondoPensiones.current) {
          const fondoPensionesInicial = tipoPension.valCadDominio;
          refFondoPensiones.current.value = fondoPensionesInicial;
        }

        const { data } = await axios.get('https://cappro-rrhh-sys.azurewebsites.net/dominios/getDominiosPorCodigo/C_MODALIDAD');

        if (data) {
          setModalidadHorariaOptions(data)
        }

        const pagoB = ((cargaHoraria * datosPlanilla.pagoHora)*MULTIPLICADOR);
        setPagoBruto(pagoB);
        const desctoSalud = (pagoB * PORCENTAJE);
        setDsctoSalud(desctoSalud);

        if (tipoPension.valCadDominio === 'AFP') {
          const afpId = datosPlanilla.idDomAfp;
          const resAfp = await axios.get('https://cappro-rrhh-sys.azurewebsites.net/dominios/getDominiosPorCodigo/C_AFP')

          setAfpOptions(resAfp.data)

          const afpType = resAfp.data.find((e) => e.idDominio === afpId);

          const afpValue = afpType.valDecDominio / 100;
          setPorcentajePension(afpValue)
          setAfp(afpType.valCadDominio);

          if (refFondoAfp.current) {
            const fondoAfpInicial = afpType.valCadDominio;
            refFondoAfp.current.value = fondoAfpInicial;
          }

          const desctoPension = (pagoB * afpValue).toFixed(2);

          setDsctoPension(desctoPension)

          const pagoNeto = pagoB - (Number(desctoPension) + Number(desctoSalud))
          setPagoNeto(pagoNeto)

        } else {
          const onpValue = tipoPension.valDecDominio / 100;
          setPorcentajePension(onpValue)

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
        <h2 className='h2-title'>EDITAR DATOS DE USUARIO</h2>
        <form className='blocks-container'>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div className='block-title-container'>
              <p className='block-title'>Datos personales</p>
              <div className='line'></div>
            </div>
            <div className='form-content'>
              <div className='form-block-modal'>
                <div className='input-container'>
                  <label htmlFor="">DNI:</label>
                  <input style={{ backgroundColor: '#E4E7E6' }} name='dni' type='number' readOnly defaultValue={user.datosPersonales.dni} />
                </div>
                <div className='input-container'>
                  <label htmlFor="">Lugar de nacimiento:</label>
                  <input style={{ backgroundColor: '#E4E7E6' }} name='lnacimiento' type='text' readOnly defaultValue={user.datosPersonales.lnacimiento} />
                </div>
                <div className='input-container'>
                  <label>Dirección:</label>
                  <input name='datosPersonales.direccion' type='text' value={user.datosPersonales.direccion || ''} onChange={handleOnChange} />
                </div>
              </div>
              <div className='form-block-modal'>
                <div className='input-container'>
                  <label>Nombres:</label>
                  <input style={{ backgroundColor: '#E4E7E6' }} name='nombres' type='text' readOnly defaultValue={user.datosPersonales.nombres} />
                </div>
                <div className='input-container'>
                  <label htmlFor=""> Edad: </label>
                  <input style={{ backgroundColor: '#E4E7E6' }} type='number' id='edad' readOnly defaultValue={edad} />
                </div>
                <div className='input-container'>
                  <label htmlFor="">Teléfono / Celular:</label>
                  <input name='datosPersonales.telefono' type='text' value={user.datosPersonales.telefono || ''} onChange={handleOnChange} />
                </div>
              </div>
              <div className='form-block-modal'>
                <div className='input-container'>
                  <label>Apellidos:</label>
                  <input style={{ backgroundColor: '#E4E7E6' }} name='apellidos' type='text' readOnly defaultValue={user.datosPersonales.apellidos} />
                </div>
                <div className='input-container'>
                  <label htmlFor=""> Sexo: </label>
                  <input style={{ backgroundColor: '#E4E7E6' }} name='apellidos' type='text' readOnly defaultValue={user.datosPersonales.sexo} />
                </div>
                <div className='input-container'>
                  <label htmlFor=""> Correo personal: </label>
                  <input style={{ backgroundColor: '#E4E7E6' }} readOnly title={user.correo} type='email' name='email' defaultValue={user.correo} />
                </div>
              </div>
              <div className='form-block-modal'>
                <div className='input-container'>
                  <label htmlFor=""> Fecha de nacimiento: </label>
                  <input style={{ backgroundColor: '#E4E7E6' }} type='date' id='fechaNacimiento' readOnly defaultValue={user.datosPersonales.fnacimiento} />
                </div>
                <div className='input-container'>
                  <label htmlFor=""> Estado civil: </label>
                  <select name='datosPersonales.estadoCivil' ref={refEstadoCivil} className='select-input' value={user.datosPersonales.estadoCivil} required onChange={handleOnChange}>
                    {
                      estadoCivilOptions.map((op, index) => (
                        <option id={index} key={index} value={op}> {op} </option>
                      ))
                    }
                  </select>
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
                  <input style={{ backgroundColor: '#E4E7E6' }} type='date' readOnly defaultValue={user.datosLaborales.fingreso} />
                </div>
                <div className='input-container'>
                  <label>Universidad/ Institución:</label>
                  <input style={{ backgroundColor: '#E4E7E6' }} name='universidad' type='text' defaultValue={user.datosLaborales.universidad} />
                </div>
              </div>
              <div className='form-block-modal'>
                <div className='input-container'>
                  <label htmlFor="">Años de experiencia:</label>
                  <input style={{ backgroundColor: '#E4E7E6' }} name='experiencia' type='number' defaultValue={user.datosLaborales.aniosExpe} />
                </div>
                <div className='input-container'>
                  <label>Especialidad:</label>
                  <input style={{ backgroundColor: '#E4E7E6' }} name='especialidad' type='text' defaultValue={user.datosLaborales.especialidad} />
                </div>
              </div>
              <div className='form-block-modal'>
                <div className='input-container'>
                  <label htmlFor=""> Año de jubilación: </label>
                  <input style={{ backgroundColor: '#E4E7E6' }} type='number' readOnly defaultValue={añoJub} />
                </div>
                <div className='input-container'>
                  <label htmlFor=""> Puesto: </label>
                  <input style={{ backgroundColor: '#E4E7E6' }} readOnly name='puesto' type='text' defaultValue={user.rol} />
                </div>
                {/*                 <div className='input-container'>
                  <label htmlFor=""> Puesto: </label>
                  <select name="rol" ref={refPuesto} className='select-input' required onChange={handleOnChange} value={user.rol}>
                    {
                      puestoOptions.map((op) => (
                        <option id={op.idRol} key={op.idRol} value={op.nombreRol}> {op.nombreRol} </option>
                      ))
                    }
                  </select>
                </div> */}
              </div>
              <div className='form-block-modal'>
                <div className='input-container'>
                  <label>Formación profesional:</label>
                  <input style={{ backgroundColor: '#E4E7E6' }} name='formacion' type='text' defaultValue={user.datosLaborales.formacion} />
                </div>
                {
                  supervisor &&
                  <div className='input-container'>
                    <label>Supervision:</label>
                    <input style={{ backgroundColor: '#E4E7E6' }} name='supervision' type='text' readOnly defaultValue={supervisor} />
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
                  <input style={{ backgroundColor: '#E4E7E6' }} name='codigoModular' type='text' readOnly defaultValue={user.datosPlanilla.codModular} />
                </div>
                <div className='input-container'>
                  <label htmlFor=""> Pago bruto: </label>
                  <input style={{ backgroundColor: '#E4E7E6' }} type='number' readOnly required defaultValue={pagoBruto} />
                </div>
                <div className='input-container'>
                  <label htmlFor=""> Descuento de pensiones: </label>
                  <input style={{ backgroundColor: '#E4E7E6' }} type='number' step="any" readOnly value={Number(dsctoPension).toFixed(2)} onChange={handleOnChange} />
                </div>
              </div>
              <div className='form-block-modal'>
                {
                  rol === 'Administrador' ?
                    <div className='input-container'>
                      <label htmlFor=""> Modalidad horaria: </label>
                      <input name='datosPlanilla.idDomModalidad' type='text' readOnly value={modalidadHoraria} onChange={handleOnChange} />
                    </div>
                    :
                    <div className='input-container'>
                      <label htmlFor=""> Modalidad horaria: </label>
                      <select name='datosPlanilla.idDomModalidad' ref={refFondoPensiones} className='select-input' required value={modalidadHoraria} onChange={handleOnChange} >
                        {
                          modalidadHorariaOptions.map((op) => (
                            <option id={op.idDominio} key={op.idDominio} value={op.valCadDominio}> {op.valCadDominio} </option>
                          ))
                        }
                      </select>
                    </div>
                }
                <div className='input-container'>
                  <label htmlFor=""> Descuento seguro de salud: </label>
                  <input style={{ backgroundColor: '#E4E7E6' }} type='number' readOnly step="any" value={Number(dsctoSalud).toFixed(2)} onChange={handleOnChange} />
                </div>
                <div className='input-container'>
                  <label htmlFor=""> Pago neto: </label>
                  <input style={{ backgroundColor: '#E4E7E6' }} type='number' id='pagoNeto' readOnly step="any" value={Number(pagoNeto).toFixed(2)} onChange={handleOnChange} />
                </div>
              </div>
              <div className='form-block-modal'>
                <div className='input-container'>
                  <label htmlFor=""> Carga horaria: </label>
                  <input style={{ backgroundColor: '#E4E7E6' }} type='text' id='cargaHoraria' readOnly value={cargaHoraria} onChange={handleOnChange} />
                </div>
                <div className='input-container'>
                  <label htmlFor=""> Fondo de pensiones: </label>
                  <select name='datosPlanilla.idDomFondpPen' ref={refFondoPensiones} className='select-input' required value={fondoPensiones} onChange={handleOnChange}>
                    {
                      fondoPensionesOptions.map((op) => (
                        <option id={op.idDomFondpPen} key={op.idDomFondpPen}> {op.name} </option>
                      ))
                    }
                  </select>
                </div>

              </div>
              <div className='form-block-modal'>
                <div className='input-container'>
                  <label htmlFor=""> Pago por hora: </label>
                  <input type='number' name='datosPlanilla.pagoHora' step="any" min={0} value={user.datosPlanilla.pagoHora || ''} onChange={handleOnChange} />
                </div>
                {
                  fondoPensiones === 'AFP' &&
                  <div className='input-container'>
                    <label htmlFor=""> AFP: </label>
                    <select ref={refFondoAfp} name='datosPlanilla.idDomAfp' className='select-input' required onChange={handleOnChange}>
                      {
                        fondoAfpOptions.map((op) => (
                          <option id={op.idDominio} key={op.idDominio}> {op.valCadDominio} </option>
                        ))
                      }
                    </select>
                  </div>
                }
              </div>
            </div>
          </div>
        </form>
        
        <div className='buttons-container'>
          <button className="main-button" onClick={toggleModal} style={{ padding: '12px 12px', fontSize: '17px', margin: '20px' }}>
            Cancelar
          </button>
          <button className="main-button" onClick={saveEdit} style={{ padding: '12px 24px', fontSize: '17px', margin: '20px' }}>
            Editar
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserEditModal