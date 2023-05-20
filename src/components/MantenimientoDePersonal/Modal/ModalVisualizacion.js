import React, { useEffect, useState } from 'react';
import _ from 'lodash'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import '../styles/mantenimientoPersonal.css'
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { JUBILACION, VALOR_TIEMPO_COMPLETO, VALOR_TIEMPO_PARCIAL, PORCENTAJE, estadoCivilOptions, sexoOptions } from '../../../constants/constants';
import { calcularEdad } from '../../../utils/utils';
import PageLoader from '../../Loading';
import USUARIOEDITAR from '../../../Global/UsuarioEditas';


const useStyles = makeStyles((theme) => ({
    root: {
      height: "98vh",
      margin: 0,
      fontFamily: "Montserrat, sans-serif"
    },
    contenedorLogo: {
      display: 'flex',
      paddingTop: 26,
    },
    logo: {
      width: '100%',
      height: '100%',
    },
    titulo: {
      margin: 0,
      textTransform: 'uppercase',
      color: theme.palette.secondary.main,
      fontWeight: 500
    },
    appBar: {
      height: '100%',
    },
    drawer: {
      marginTop: 50,
      color: theme.palette.primary.main,
    },
    contenedorMenu: {
      position: 'absolute',
      width: '18%',
      height: '87%',
      boxShadow: theme.shadows[6],
    },
    letraMenu: {
      fontWeight: 700,
      color: theme.palette.primary.main,
    },
    iconoPrincipal: {
      width: '40%',
      height: '40%',
      marginLeft: 15
    },
    tipoletra1: {
      fontWeight: 500
    },
    tipoletra2: {
      fontWeight: 700
    },
    color1Primario: {
      color: theme.palette.primary.main,
    },
    colorSecundario: {
      color: theme.palette.primary.main,
    },
    contenedorFormulario: {
      width: "130vh",
      height: "80%",
      marginLeft: '18%',
      position: 'absolute',
      textAlign: 'center',
      marginTop: 50,
      display: 'flex',
      flexDirection: 'column'
    },
    formulario: {
      marginLeft: '6%',
      boxShadow: theme.shadows[6],
      width: "150vh",
      height: '90%',
    },
    formControl: {
      minWidth: 120,
      height: '50px', // Altura deseada
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#0066CC'
        },
      },
    },
    modalVisual: {
      position: 'absolute',
      top: '15%',
      left: '20%',
      width: 1400,
      height: 740,
      border: '2px solid #0066CC',
      backgroundColor: 'white',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2,4,3,4),
    }
  }));

const ModalVisualizacion = () => {
    const classes = useStyles();

    const navigate = useNavigate();
    const onSubmit = (url) => {
        navigate(url);
        console.log(url);
    }

    const [modal, setModal]=useState(false);
    const abrirCerrarModal =()=>{
    setModal(!modal);
    }


    const INITIAL_FONDO_PENSIONES = [
    {
        valCadDominio: '',
        valDecDominio: 0 | null,
        idDominio: 0
    }
    ]

    const [age, setAge] = React.useState(0);
    const [jubilacion, setJubilacion] = useState(0);
    const [birthday, setBirthday] = useState('');
    const [puesto, setPuesto] = useState({ nombreRol: '', idRol: 0 });
    const [options, setOptions] = useState([]);
    const [modalidadHoraria, setModalidadHoraria] = useState({ idDominio: 0, valCadDominio: '' });
    const [fondoPension, setFondoPension] = useState({ valCadDominio: '', valDecDominio: 0 | null, idDominio: 0, idDomAfp: null });
    const [fondoPensionesList, setFondoPensionesList] = useState(INITIAL_FONDO_PENSIONES);
    const [cargaHoraria, setCargaHoraria] = useState(0);
    const [pagoBruto, setPagoBruto] = useState(0);
    const [pagoNeto, setPagoNeto] = useState(0);
    const [pagoHora, setPagoHora] = useState(0);
    const [seguroSalud, setSeguroSalud] = useState(0);
    const [descuentoPension, setDescuentoPension] = useState(0);
    const [email, setEmail] = useState('');


    const [dni, setDni] = useState('');
    const [especialidad, setEspecialidad] = useState('');
    const [formacion, setFormacion] = useState('');
    const [universidad, setUniversidad] = useState('');
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [direccion, setDireccion] = useState('');
    const [lnacimiento, setlNacimiento] = useState('');
    const [telefono, setTelefono] = useState('');
    const [experiencia, setExperiencia] = useState('');
    const [estadoCivil, setEstadoCivil] = useState('');
    const [sexo, setSexo] = useState('');
    const [codigoModular, setCodigoModular] = useState('');
    const [supervision, setSupervision] = useState({ idUsuario: 0, nombreCompleto: '' });
    const [showSupervision, setShowSupervision] = useState(false);

    const [puestoOptions, setPuestoOptions] = useState([]);
    const [afpOptions, setAfpOptions] = useState([]);
    const [supervisionOptions, setSupervisionOptions] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const onRegistrarPersonal = async (e) => {
    e.preventDefault();
    const body = {
        correo: email,
        datosLaborales: {
        aniosExpe: Number(experiencia),
        especialidad,
        fingreso: new Date().toISOString().substring(0, 10),
        formacion,
        universidad
        },
        datosPersonales: {
        apellidos,
        direccion,
        dni,
        estadoCivil,
        fnacimiento: birthday,
        lnacimiento,
        nombres,
        sexo,
        telefono
        },
        datosPlanilla: {
        cargaHoraria: cargaHoraria,
        codModular: codigoModular,
        idDomAfp: fondoPension.idDomAfp,
        idDomFondpPen: fondoPension.idDominio,
        idDomModalidad: Number(modalidadHoraria.idDominio),
        pagoHora: Number(pagoHora)
        },
        idRol: Number(puesto.idRol),
        idUsuarioSup: supervision.idUsuario
    }

    
    try {
        console.log('datos a enviar: ', body)
        setLoading(true);
        const res = await axios.post('https://cappro-rrhh-sys.azurewebsites.net/usuario/saveUsuario', body);
        if (res.data) {
        alert('El usuario ha sido agregado correctamente')
        navigate('/mantenimientopersonal')
        }
        console.log('respuesta del servidor: ', res.data)
    } catch (error) {
        console.log({ error: error.response.data })
        alert(error.response.data);
    }
    setLoading(false);
    }

    useEffect(() => {
        setPagoBruto(USUARIOEDITAR.cargaHoraria * USUARIOEDITAR.pagoHora)
      }, [pagoHora, cargaHoraria])
    
      useEffect(() => {
        setCargaHoraria(modalidadHoraria.valCadDominio === 'Tiempo Parcial' ? VALOR_TIEMPO_PARCIAL : VALOR_TIEMPO_COMPLETO)
      }, [modalidadHoraria])
    
      useEffect(() => {
        setSeguroSalud((pagoBruto * PORCENTAJE).toFixed(2))
      }, [pagoBruto])
    
    
      useEffect(() => {
        setDescuentoPension((pagoBruto * fondoPension.valDecDominio).toFixed(2))
      }, [pagoBruto, fondoPension])
    
      useEffect(() => {
        setPagoNeto((pagoBruto - (Number(descuentoPension) + Number(seguroSalud))).toFixed(2))
      }, [pagoBruto, descuentoPension, seguroSalud])

    const handleNumberChange = (e, limit) => {
    const value = e.target.value;
    const name = e.target.name;

    const newValue = value.replace(/[^0-9]/g, '').substring(0, limit);

    if (name === 'dni') {
        if (newValue[0] === "0") {
        return;
        }
        else {
        setDni(newValue)
        }
    }
    else if (name === 'experiencia') {
        setExperiencia(newValue)
    }
    else if (name === 'codigoModular') {
        setCodigoModular(newValue)
    }
    else {
        setTelefono(newValue)
    }
    }

    const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    }

    function handleBirthday(event) {
    const nuevaFecha = event.target.value;
    setBirthday(nuevaFecha)
    const edad = calcularEdad(nuevaFecha);
    setAge(edad);

    }

    const calcularJubilacion = () => {
    const jubilacion = age > JUBILACION ? new Date().getFullYear() : (JUBILACION - age) + new Date().getFullYear();
    return jubilacion;
    }

    const onPuestoSelect = async (rolId, puesto) => {
    try {
        console.log('rolid: ', rolId)
        console.log('puesto: ', puesto)
        setPuesto({ nombreRol: puesto, idRol: rolId });
        if (puesto === 'Administrador') {
        setSupervision({ idUsuario: null, nombreCompleto: null });
        setShowSupervision(false);
        }
        else {

        let idRol = 0
        puesto === 'Supervisor' ? idRol = 2 : idRol = 3;
        setShowSupervision(true);
        const res = await axios.get(`https://cappro-rrhh-sys.azurewebsites.net/usuario/getUsuariosSupervisores/${idRol}`);
        if (res) {
            setSupervisionOptions(res.data)
            setSupervision({ idUsuario: res.data[0].idUsuario, nombreCompleto: res.data[0].nombreCompleto })
        }

        }
    } catch (error) {
        setSupervisionOptions([])
        console.log(error)
    }
    }

    const onSupervisionSelect = (e) => {
    const currentSupervision = e.target.value;

    const getSupervisor = supervisionOptions.find(e => e.nombreCompleto === currentSupervision)

    setSupervision({
        idUsuario: getSupervisor.idUsuario,
        nombreCompleto: currentSupervision
    })
    }

    const onFondoPensionesSelect = async () => {
    const getCurrentPension = fondoPensionesList.find(e => e.valCadDominio === USUARIOEDITAR.idDomFondpPen)
    if (getCurrentPension.valCadDominio === 'ONP') {
        const porcentaje = getCurrentPension.valDecDominio / 100;
        setFondoPension({
        valCadDominio: getCurrentPension.valCadDominio,
        valDecDominio: porcentaje,
        idDominio: getCurrentPension.idDominio,
        idDomAfp: null
        })
    }
    else {
        const res = await axios.get(`https://cappro-rrhh-sys.azurewebsites.net/dominios/getDominiosPorCodigo/C_AFP`);
        setAfpOptions(res.data);
        setFondoPension({
        valDecDominio: res.data[0].valDecDominio / 100,
        valCadDominio: getCurrentPension.valCadDominio,
        idDominio: getCurrentPension.idDominio,
        idDomAfp: res.data[0].idDominio
        })
    }
    }

    const onAfpSelect = (afpType) => {
    const getCurrentAfp = afpOptions.find(afp => afp.valCadDominio === afpType)

    const porcentaje = getCurrentAfp.valDecDominio / 100;
    setFondoPension({
        ...fondoPension,
        valDecDominio: porcentaje,
        valCadDominio: 'AFP',
        idDomAfp: getCurrentAfp.idDominio,
    })
    }

    return(
    <div className={classes.modalVisual}>
        <div >
        <form>
            <div className='mp-form-container'>
            <h2>DATOS DEL USUARIO</h2>
            <div className='blocks-container'>
                <div>
                <div className='block-title-container'>
                    <p className='block-title'>Datos personales</p>
                    <div className='line'></div>
                </div>
                <div className='form-content'>
                    <div className='form-block'>
                    <div className='input-container'>
                        <label htmlFor="">DNI</label>
                        <input name='dni' type='number' readOnly  value={USUARIOEDITAR.dni} onChange={(e) => handleNumberChange(e, 8)} />
                        
                    </div>
                    <div className='input-container'>
                        <label htmlFor="">Lugar de nacimiento:</label>
                        <input name='lnacimiento' type='text' readOnly  value={USUARIOEDITAR.lnacimiento}/>
                    </div>
                    <div className='input-container'>
                        <label>Dirección:</label>
                        <input name='direccion' type='text' readOnly value={USUARIOEDITAR.direccion} />
                    </div>
                    </div>
                    <div className='form-block'>
                    <div className='input-container'>
                        <label>Nombres:</label>
                        <input name='nombres' type='text' readOnly value={USUARIOEDITAR.nombres} />
                    </div>
                    <div className='input-container'>
                        <label htmlFor=""> Edad: </label>
                        <input type='number' id='edad' readOnly value='26' onChange={(e) => setAge(e.target.value)}/>
                    </div>
                    <div className='input-container'>
                        <label htmlFor="">Teléfono / Celular:</label>
                        <input name='telefono' type='text' readOnly  value={USUARIOEDITAR.telefono}/>
                    </div>
                    </div>
                    <div className='form-block'>
                    <div className='input-container'>
                        <label>Apellidos:</label>
                        <input name='apellidos' type='text' readOnly  value={USUARIOEDITAR.apellidos} />
                    </div>
                    <div className='input-container'>
                        <label htmlFor=""> Sexo: </label>
                        <select className='select-input' disabled value={USUARIOEDITAR.sexo} onChange={(e) => setSexo(e.target.value)}>
                        {
                            sexoOptions.map((op, index) => (
                            <option id={index} key={index} value={USUARIOEDITAR.sexo}> {USUARIOEDITAR.sexo} </option>
                            ))
                        }
                        </select>
                    </div>
                    <div className='input-container'>
                        <label htmlFor=""> Correo personal: </label>
                        <input type='email' name='email' readOnly maxLength={60} value={USUARIOEDITAR.correo}/>
                    </div>
                    </div>
                    <div className='form-block'>
                    <div className='input-container'>
                        <label htmlFor=""> Fecha de nacimiento: </label>
                        <input type='date' id='fechaNacimiento' readOnly value={USUARIOEDITAR.fnacimiento}/>
                    </div>
                    <div className='input-container'>
                        <label htmlFor=""> Estado civil: </label>
                        <select className='select-input' disabled value={USUARIOEDITAR.estadoCivil} >
                        {
                            estadoCivilOptions.map((op, index) => (
                            <option id={index} readOnly key={index} value={USUARIOEDITAR.estadoCivil}> {USUARIOEDITAR.estadoCivil} </option>
                            ))
                        }
                        </select>
                    </div>
                    </div>
                </div>
                </div>

                <div>
                <div className='block-title-container'>
                    <p className='block-title'>Datos laborales</p>
                    <div className='line'></div>
                </div>
                <div className='form-content'>
                    <div className='form-block'>
                    <div className='input-container'>
                        <label htmlFor=""> Fecha de Ingreso: </label>
                        <input type='date' readOnly value={USUARIOEDITAR.fingreso} />
                    </div>
                    <div className='input-container'>
                        <label>Universidad/ Institución:</label>
                        <input name='universidad' type='text' readOnly  value={USUARIOEDITAR.universidad}/>
                    </div>
                    </div>
                    <div className='form-block'>
                    <div className='input-container'>
                        <label htmlFor="">Años de experiencia:</label>
                        <input name='experiencia' type='number' readOnly  value={USUARIOEDITAR.aniosExpe} />
                    </div>
                    <div className='input-container'>
                        <label>Especialidad:</label>
                        <input name='especialidad' type='text' readOnly value={USUARIOEDITAR.especialidad} />
                    </div>
                    </div>
                    <div className='form-block'>
                    <div className='input-container'>
                        <label htmlFor=""> Año de jubilación: </label>
                        <input type='number' readOnly required  value='2062'/>
                        {/* {age === 0 ? 0 : calcularJubilacion()} onChange={(e) => setJubilacion(e.target.value)} */}
                    </div>
                    <div className='input-container'>
                      <label htmlFor=""> Puesto: </label>
                      <input readOnly value={USUARIOEDITAR.rol}></input>
                    </div>
                    </div>
                    <div className='form-block'>
                    <div className='input-container'>
                        <label>Formación profesional:</label>
                        <input name='formacion' type='text' readOnly  value={USUARIOEDITAR.formacion}/>
                    </div>
                    {
                        showSupervision &&
                        <div className='input-container'>
                        <label htmlFor=""> Supervision: </label>
                        <select className='select-input' name="" id="" required  onChange={onSupervisionSelect}>
                            {
                            supervisionOptions.map((user) => (
                                <option key={user.idUsuario} value={user.nombreCompleto}> {user.nombreCompleto} </option>
                            ))
                            }
                        </select>
                        </div>
                    }
                    </div>
                </div>
                </div>

                <div>
                <div className='block-title-container'>
                    <p className='block-title'>Datos de planilla</p>
                    <div className='line'></div>
                </div>
                <div className='form-content'>
                    <div className='form-block'>
                    <div className='input-container'>
                        <label htmlFor="">Código modular:</label>
                        <input name='codigoModular' type='text' readOnly value={USUARIOEDITAR.codModular}/>
                    </div>
                    <div className='input-container'>
                        <label htmlFor=""> Pago bruto: </label>
                        <input type='number' readOnly   value={USUARIOEDITAR.cargaHoraria * USUARIOEDITAR.pagoHora} onChange={(e) => setPagoBruto(e.target.value)} />
                    </div>
                    <div className='input-container'>
                        <label htmlFor=""> Descuento de pensiones: </label>
                        <input type='number' readOnly   value='292.50' onChange={(e) => setDescuentoPension(e.target.value)} />
                    </div>
                    </div>
                    <div className='form-block'>
                    <div className='input-container'>
                      <label htmlFor=""> Modalidad horaria: </label>
                      <input value='Tiempo Completo'></input>
                      {/* {
                        !showSupervision ?
                          <input type='text' readOnly required  value={modalidadHoraria.valCadDominio} onChange={(e) => setModalidadHoraria(e.target.value)} />
                          :
                          <select className='select-input' name="" id="" required  onChange={(e) => {
                            console.log(e.target.value)
                            setModalidadHoraria({
                              valCadDominio: e.target.value,
                              idDominio: e.target.options[e.target.selectedIndex].id
                            })
                            e.target.value === 'Tiempo Completo' ? setCargaHoraria(VALOR_TIEMPO_COMPLETO) : setCargaHoraria(VALOR_TIEMPO_PARCIAL);
                          }}>
                            {
                              options.map((op) => (
                                <option id={op.idDominio} key={op.idDominio} value={op.valCadDominio}> {op.valCadDominio} </option>
                              ))
                            }
                          </select>
                      } */}
                    </div>

                    <div className='input-container'>
                        <label htmlFor=""> Descuento seguro de salud: </label>
                        <input type='number' readOnly   value={seguroSalud} onChange={(e) => setSeguroSalud(e.target.value)} />
                    </div>
                    <div className='input-container'>
                        <label htmlFor=""> Pago neto: </label>
                        <input type='number' id='pagoNeto' readOnly step="any" value={pagoNeto} min={0} onChange={(e) => {
                        setPagoNeto(e.target.value)
                        }} />
                    </div>
                    </div>
                    <div className='form-block'>
                    <div className='input-container'>
                        <label htmlFor=""> Carga horaria: </label>
                        <input type='number' id='cargaHoraria' readOnly value={USUARIOEDITAR.cargaHoraria} />
                    </div>
                    <div className='input-container'>
                        <label htmlFor=""> Fondo de pensiones: </label>
                        {/* <select className='select-input' readOnly  onChange={(e) => { onFondoPensionesSelect(e.target.value) }}>
                        {
                            fondoPensionesList.map((op, index) => (
                            <option key={index}> {op.valCadDominio} </option>
                            ))
                        }
                        </select> */}
                        <input value = 'ONP'></input>
                    </div>
                    </div>
                    <div className='form-block'>
                    <div className='input-container'>
                        <label htmlFor=""> Pago por hora: </label>
                        <input type='number' id='pagoPorHora' readOnly step="any" min={0} max={60} value={USUARIOEDITAR.pagoHora} onChange={(e) => {
                        setPagoHora(e.target.value > 60 ? 60 : e.target.value)
                        }} />
                    </div>
                    {
                        fondoPension.valCadDominio === 'AFP' &&
                        <div className='input-container'>
                        <label htmlFor=""> AFP: </label>
                        <select className='select-input' readOnly onChange={(e) => { onAfpSelect(e.target.value) }}>
                            {
                            afpOptions.map((op) => (
                                <option key={op.idDominio}> {op.valCadDominio} </option>
                            ))
                            }
                        </select>
                        </div>
                    }
                    {loading ? <PageLoader/> : null}
                    </div>
                </div>
                </div>
            </div>
            <div className='buttons-container'>
                <div>
                
                </div>
            </div>
            </div>     
        </form>
        </div>
    </div>
    )           
}

export default ModalVisualizacion;