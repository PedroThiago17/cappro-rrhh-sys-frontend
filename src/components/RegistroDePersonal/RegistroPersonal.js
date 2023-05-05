import React, { useEffect, useState } from 'react';
import _ from 'lodash'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, List, ListItem, ListItemIcon, ListItemText, Collapse, MenuItem, FormControl, InputLabel, Select } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import clsx from 'clsx';
import RegistroInput from '../Comunes/RegistroInput'
import './styles/registroPersonal.css'
import { useNavigate } from 'react-router-dom';


const JUBILACION = 65;
const VALOR_BD = 20;
const PORCENTAJE = 0.09;
const sexoOptions = ['Seleccionar', 'Masculino', 'Femenino', 'No especifica'];
const estadoCivilOptions = ['Seleccionar', 'Soltero', 'Casado', 'Viudo', 'Divorciado'];
const puestoOptions = ['Seleccionar', 'Supervisor', 'Personal'];
const supervisionOptions = ['Seleccionar', 'Administrador', 'Supervisor'];
const fondoPensionesOptions = ['Seleccionar', 'AFP', 'ONP'];
const AFPOptions = ['Seleccionar', 'Profuturo', 'AFP Integra', 'Prima AFP', 'AFP Habitat'];
const mhPersonal = ['Seleccionar', 'Tiempo completo', 'Tiempo parcial'];
const mhSupervisor = ['Seleccionar', 'Tiempo completo'];


const calcularEdad = (fechaNacimiento) => {
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);

  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();

  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  return edad;
}

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}



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
}));

const RegistroPersonal = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [age, setAge] = React.useState(0);
  const [jubilacion, setJubilacion] = useState(0);
  const [birthday, setBirthday] = useState('');
  const [puesto, setPuesto] = useState('');
  const [options, setOptions] = useState([]);
  const [modalidadHoraria, setModalidadHoraria] = useState('');
  const [fondoPensiones, setFondoPensiones] = useState({ tipo: '', porcentaje: 0 });
  const [cargaHoraria, setCargaHoraria] = useState(0);
  const [pagoBruto, setPagoBruto] = useState(0);
  const [pagoNeto, setPagoNeto] = useState(0);
  const [pagoHora, setPagoHora] = useState(0);
  const [seguroSalud, setSeguroSalud] = useState(0);
  const [descuentoPension, setDescuentoPension] = useState(0);
  const [email, setEmail] = useState('');


  const handleEmailChange = (e) => {
    const value = e.target.value;
    console.log(value)
    setEmail(value);
  }


  useEffect(() => {
    if (puesto === 'Supervisor') {
      setOptions(mhSupervisor)
    } else {
      setOptions(mhPersonal)
    }
  }, [puesto]);

  useEffect(() => {
    setPagoBruto(cargaHoraria * pagoHora)
  }, [pagoHora, cargaHoraria])

  useEffect(() => {
    setSeguroSalud((pagoBruto * PORCENTAJE).toFixed(2))
  }, [pagoBruto])


  useEffect(() => {
    setDescuentoPension((pagoBruto * fondoPensiones.porcentaje).toFixed(2))
  }, [pagoBruto, fondoPensiones])

  useEffect(() => {
    setPagoNeto((pagoBruto - (Number(descuentoPension) + Number(seguroSalud))))
  }, [pagoBruto, descuentoPension, seguroSalud])


  const handleClick = () => {
    setOpen(!open);
  };

  const calcularJubilacion = () => {
    const jubilacion = age > JUBILACION ? new Date().getFullYear() : (JUBILACION - age) + new Date().getFullYear();
    return jubilacion;
  }


  function handleBirthday(event) {
    const nuevaFecha = event.target.value;
    const edad = calcularEdad(nuevaFecha);
    setAge(edad);
    setBirthday(nuevaFecha)
  }

  const navigate = useNavigate();
  const onSubmit = (url) => {
    navigate(url);
    console.log(url);
  }

  return (
    <div className={clsx(classes.root)}>
      <div style={{ height: '13%', margin: 0 }}>
        <AppBar position="relative" className={classes.appBar}>
          <Toolbar>
            <div className={clsx(classes.contenedorLogo)}>
              <div style={{ width: '7%', height: '100%' }}>
                <img className={clsx(classes.logo)} src='./images/Recurso1.png' />
              </div>
              <div style={{ justifyContent: 'center', marginLeft: 10, marginTop: 3 }}>
                <h3 className={clsx(classes.titulo)} style={{ fontSize: 15 }}>escuela superior de arte dramático de trujillo</h3>
                <h2 className={clsx(classes.titulo)} style={{ fontSize: 29, }}>virgilio rodriguez nache</h2>
                <p className={clsx(classes.titulo)} style={{ textTransform: 'none', fontSize: 10 }}>Autorizado por D.S N 055-1985-ED / Resolución N1 0360-2011-ANR</p>
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </div>
      <div className={clsx(classes.contenedorMenu)}>
        <List component="nav" className={classes.drawer} aria-label="menu">
          <ListItem style={{ padding: 20 }} button onClick={handleClick}>
            <ListItemIcon>
              <img style={{ marginLeft: 10, width: '56%', height: '56%' }} src='./images/Recurso4.png' />
            </ListItemIcon>
            <ListItemText disableTypography primary="Gestión de Personal" className={clsx(classes.tipoletra2)} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component='div' disablePadding>
              <ListItem button style={{ marginLeft: 20 }} onClick={() => onSubmit('/registropersonal')}>
                <ListItemIcon>
                  <img style={{ marginLeft: 40 }} src='./images/Recurso7.png' />
                </ListItemIcon>
                <ListItemText disableTypography className={clsx(classes.tipoletra1)} primary='Registro de Personal' />
              </ListItem>
              <ListItem button style={{ marginLeft: 20 }} onClick={() => onSubmit('/mantenimientopersonal')}>
                <ListItemIcon>
                  <img style={{ marginLeft: 40 }} src='./images/Recurso7.png' />
                </ListItemIcon>
                <ListItemText disableTypography component='div' className={clsx(classes.tipoletra1)} primary='Mantenimiento de personal' />
              </ListItem>
            </List>
          </Collapse>
          <ListItem style={{ padding: 20 }} button onClick={() => onSubmit('/reporteplanilla')}>
            <ListItemIcon>
              <img className={clsx(classes.iconoPrincipal)} src='./images/Recurso5.png' />
            </ListItemIcon>
            <ListItemText disableTypography className={clsx(classes.tipoletra2)} primary="Reporte de Planillas" />
          </ListItem>
          <ListItem style={{ padding: 20 }} button onClick={() => onSubmit('/reporteasistencia')}>
            <ListItemIcon>
              <img className={clsx(classes.iconoPrincipal)} src='./images/Recurso6.png' />
            </ListItemIcon>
            <ListItemText disableTypography className={clsx(classes.tipoletra2)} primary="Reporte de Asistencia" />
          </ListItem>
        </List>
      </div>
      <div className={clsx(classes.contenedorFormulario)}>
        <form className={clsx(classes.formulario)}>
          <div className='mp-form-container'>
            <h2>REGISTRAR NUEVO PERSONAL</h2>
            <div className='blocks-container'>
              <div>
                <div className='block-title-container'>
                  <p className='block-title'>Datos personales</p>
                  <div className='line'></div>
                </div>
                <div className='form-content'>
                  <div className='form-block'>
                    <RegistroInput label={'DNI:'} type={'number'} maxlenght="8"></RegistroInput>
                    <RegistroInput label={'Lugar de nacimiento:'}></RegistroInput>
                    <RegistroInput label={'Dirección:'}></RegistroInput>
                  </div>
                  <div className='form-block'>
                    <RegistroInput label={'Nombres:'}></RegistroInput>
                    <div className='input-container'>
                      <label htmlFor=""> Edad: </label>
                      <input type='number' id='edad' readOnly value={age} onChange={(e) => setAge(e.target.value)} />
                    </div>
                    <RegistroInput label={'Teléfono / Celular:'}></RegistroInput>
                  </div>
                  <div className='form-block'>
                    <RegistroInput label={'Apellidos:'}></RegistroInput>
                    <RegistroInput label={'Sexo:'} type={'select'} options={sexoOptions}></RegistroInput>
                    <div className='input-container'>
                      <label htmlFor=""> Correo personal: </label>
                      <input type='email' name='email' maxLength={60} value={email} onChange={handleEmailChange} />
                    </div>
                  </div>
                  <div className='form-block'>
                    <div className='input-container'>
                      <label htmlFor=""> Fecha de nacimiento: </label>
                      <input type='date' required id='fechaNacimiento' value={birthday} onChange={handleBirthday} />
                    </div>
                    <RegistroInput label={'Estado civil:'} type='select' options={estadoCivilOptions}></RegistroInput>
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
                    <RegistroInput label={'Fecha de Ingreso:'}></RegistroInput>
                    <RegistroInput label={'Universidad/ Institución:'}></RegistroInput>
                  </div>
                  <div className='form-block'>
                    <RegistroInput label={'Años de experiencia:'}></RegistroInput>
                    <RegistroInput label={'Especialidad:'}></RegistroInput>
                  </div>
                  <div className='form-block'>
                    <div className='input-container'>
                      <label htmlFor=""> Año de jubilación: </label>
                      <input type='number' readOnly required value={age === 0 ? 0 : calcularJubilacion()} onChange={(e) => setJubilacion(e.target.value)} />
                    </div>
                    <div className='input-container'>
                      <label htmlFor=""> Puesto: </label>
                      <select className='select-input' name="" id="" required onChange={(e) => setPuesto(e.target.value)}>
                        {
                          puestoOptions.map((op, index) => (
                            <option key={index} value={op}> {op} </option>
                          ))
                        }
                      </select>
                    </div>
                  </div>
                  <div className='form-block'>
                    <RegistroInput label={'Formación profesional:'}></RegistroInput>
                    <RegistroInput label={'Supervisión:'} type='select' options={supervisionOptions}></RegistroInput>
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
                    <RegistroInput label={'Código modular:'}></RegistroInput>
                    <div className='input-container'>
                      <label htmlFor=""> Pago bruto: </label>
                      <input type='number' readOnly required value={cargaHoraria * pagoHora} onChange={(e) => setPagoBruto(e.target.value)} />
                    </div>
                    <div className='input-container'>
                      <label htmlFor=""> Descuento seguro de salud: </label>
                      <input type='number' readOnly required value={seguroSalud} onChange={(e) => setSeguroSalud(e.target.value)} />
                    </div>
                  </div>
                  <div className='form-block'>
                    <div className='input-container'>
                      <label htmlFor=""> Modalidad horaria: </label>
                      <select className='select-input' name="" id="" required onChange={(e) => {
                        setModalidadHoraria(e.target.value)
                        e.target.value === 'Tiempo completo' ? setCargaHoraria(VALOR_BD) : setCargaHoraria(0);
                      }}>
                        {
                          options.map((op, index) => (
                            <option key={index} value={op}> {op} </option>
                          ))
                        }
                      </select>
                    </div>
                    <div className='input-container'>
                      <label htmlFor=""> Fondo de pensiones: </label>
                      <select className='select-input' name="" id="" required onChange={(e) => {
                        setFondoPensiones({
                          tipo: e.target.value,
                          porcentaje: e.target.value === 'AFP' ? 0.1 : 0.13
                        })
                      }}>
                        {
                          fondoPensionesOptions.map((op, index) => (
                            <option key={index} value={op}> {op} </option>
                          ))
                        }
                      </select>
                    </div>
                    <div className='input-container'>
                      <label htmlFor=""> Descuento de pensiones: </label>
                      <input type='number' readOnly required value={descuentoPension} onChange={(e) => setDescuentoPension(e.target.value)} />
                    </div>                  </div>
                  <div className='form-block'>
                    <div className='input-container'>
                      <label htmlFor=""> Carga horaria: </label>
                      <input type='number' id='cargaHoraria' readOnly value={cargaHoraria} onChange={e => {
                        setCargaHoraria(e.target.value)
                      }} />
                    </div>

                    {
                      fondoPensiones.tipo === 'AFP' && <RegistroInput label={'AFP:'} type={'select'} options={AFPOptions}></RegistroInput>
                    }
                  </div>
                  <div className='form-block'>
                    <div className='input-container'>
                      <label htmlFor=""> Pago por hora: </label>
                      <input type='number' id='pagoPorHora' value={pagoHora} min={0} onChange={(e) => {
                        setPagoHora(e.target.value)
                      }} />
                    </div>
                    <div className='input-container'>
                      <label htmlFor=""> Pago neto: </label>
                      <input type='number' id='pagoNeto' value={pagoNeto} min={0} onChange={(e) => {
                        setPagoNeto(e.target.value)
                      }} />

                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='buttons-container'>
              <button className='main-button'>Tomar fotos</button>
              <div>
                <button className='main-button'>Limpiar</button>
                <button className='main-button'>Guardar</button>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}

export default RegistroPersonal;