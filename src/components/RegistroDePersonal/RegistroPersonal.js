import React from 'react';
import _ from 'lodash'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, List, ListItem, ListItemIcon, ListItemText, Collapse, MenuItem, FormControl, InputLabel, Select } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import clsx from 'clsx';
import RegistroInput from '../Comunes/RegistroInput'
import './styles/registroPersonal.css'

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
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
    width: "100%",
    height: "100%",
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
    width: "70%",
    height: '750px',
    [theme.breakpoints.down('xl')]: {
      height: '700px',
    },
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

  const handleClick = () => {
    setOpen(!open);
  };

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const sexoOptions = [' ', 'Masculino', 'Femenino', 'No especifica'];
  const estadoCivilOptions = [' ', 'Soltero', 'Casado', 'Viudo', 'Divorciado'];
  const puestoOptions = [' ', 'Supervisor', 'Personal'];
  const supervisionOptions = [' ', 'Administrador', 'Supervisor'];
  const modalidadHorariaOptions = [' ', 'Tiempo completo', 'Tiempo parcial'];
  const fondoPensionesOptions = [' ', 'AFP', 'ONP'];
  const AFPOptions = [' ', '1', '2'];

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
              <ListItem button style={{ marginLeft: 20 }}>
                <ListItemIcon>
                  <img style={{ marginLeft: 40 }} src='./images/Recurso7.png' />
                </ListItemIcon>
                <ListItemText disableTypography className={clsx(classes.tipoletra1)} primary='Registro de Personal' />
              </ListItem>
              <ListItem button style={{ marginLeft: 20 }}>
                <ListItemIcon>
                  <img style={{ marginLeft: 40 }} src='./images/Recurso7.png' />
                </ListItemIcon>
                <ListItemText disableTypography component='div' className={clsx(classes.tipoletra1)} primary='Mantenimiento de personal' />
              </ListItem>
            </List>
          </Collapse>
          <ListItem style={{ padding: 20 }} button>
            <ListItemIcon>
              <img className={clsx(classes.iconoPrincipal)} src='./images/Recurso5.png' />
            </ListItemIcon>
            <ListItemText disableTypography className={clsx(classes.tipoletra2)} primary="Reporte de Planillas" />
          </ListItem>
          <ListItem style={{ padding: 20 }} button>
            <ListItemIcon>
              <img className={clsx(classes.iconoPrincipal)} src='./images/Recurso6.png' />
            </ListItemIcon>
            <ListItemText disableTypography className={clsx(classes.tipoletra2)} primary="Reporte de Asistencia" />
          </ListItem>
        </List>
      </div>
      <div className={clsx(classes.contenedorFormulario)}>
        <form className={clsx(classes.formulario)}>
          <div className='form-container'>
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
                    <RegistroInput label={'Edad:'}></RegistroInput>
                    <RegistroInput label={'Teléfono / Celular:'}></RegistroInput>
                  </div>
                  <div className='form-block'>
                    <RegistroInput label={'Apellidos:'}></RegistroInput>
                    <RegistroInput label={'Sexo:'} type={'select'} options={sexoOptions}></RegistroInput>
                    <RegistroInput label={'Correo Personal: '}></RegistroInput>
                  </div>
                  <div className='form-block'>
                    <RegistroInput label={'Fecha de nacimiento:'}></RegistroInput>
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
                    <RegistroInput label={'Años de jubilación:'}></RegistroInput>
                    <RegistroInput label={'Puesto:'} type={'select'} options={puestoOptions}></RegistroInput>
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
                    <RegistroInput label={'Pago bruto:'}></RegistroInput>
                    <RegistroInput label={'Descuento seguro de salud:'}></RegistroInput>
                  </div>
                  <div className='form-block'>
                    <RegistroInput label={'Modalidad horaria:'} type={'select'} options={modalidadHorariaOptions}></RegistroInput>
                    <RegistroInput label={'Fondo de pensiones:'} type={'select'} options={fondoPensionesOptions}></RegistroInput>
                    <RegistroInput label={'Descuento de pensiones:'}></RegistroInput>
                  </div>
                  <div className='form-block'>
                    <RegistroInput label={'Carga horaria:'}></RegistroInput>
                    <RegistroInput label={'AFP:'} type={'select'} options={sexoOptions}></RegistroInput>
                  </div>
                  <div className='form-block'>
                    <RegistroInput label={'Pago por hora:'}></RegistroInput>
                    <RegistroInput label={'Pago neto:'}></RegistroInput>
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