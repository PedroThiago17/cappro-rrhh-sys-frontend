import React, { useState } from 'react'
import _ from 'lodash'
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Tooltip from '@material-ui/core/Tooltip';
import clsx from 'clsx';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { Button } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Buffer } from 'buffer';
import { ClipLoader } from "react-spinners";
import PageLoader from './Loading';
import NavBar from './MenuPrincipal/NavBar';
import USUARIOLOGEADO from '../Global/Globals';
import VALIDAR from '../Global/Validar'
import '../login.css'

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    height: "100vh",
    fontFamily: "Montserrat, sans-serif",
  },
  titulo: {
    textAlign: "center",
    marginTop: 100
  },
  tipoletra1: {
    fontWeight: 500
  },
  tipoletra2: {
    fontWeight: 700
  },
  h1: {
    textTransform: "uppercase",
    fontSize: 45,
    margin: 0,
    marginBottom: 120,
  },
  h3: {
    margin: 0,
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '40ch'
  },
  color1: {
    color: theme.palette.primary.main,
  },
  color2: {
    color: theme.palette.secondary.main,
  },
  formulario: {
    display: 'flex',
    alingItems: 'center',
    marginLeft: 200,
    width: '50%'
  },
  tamanoLabel: {
    marginTop: 2.5,
    height: 30,
    borderRadius: 10,
  },
  logo: {
    width: '40%',
    height: '40%',
    marginBottom: 40,
  },
  icono: {
    paddingRight: 20,
    paddingTop: 16,
    width: '4%',
    height: '4%',
  },
  divisionpantallas: {
    flex: 1,
    boxShadow: theme.shadows[10],
  },
  contenedorboton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '15vh',
  },
  boton: {
    borderRadius: 10,
    height: 35,
    width: 140,
    fontFamily: "Montserrat, sans-serif",
  }
}));

const Login = ({ setIsAuthenticated }) => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    showPassword: false,
  });
  const [usuario, setUsuario] = React.useState({
    correo: '',
    contra: '',
  });
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrase, setContra] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (prop) => (event) => {
    setUsuario({ ...usuario, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const contraEncrypted = "";
    // contra = encryptPassword(contra);

    try {

      if (!correo || !contrase) {
        alert('Por favor, complete todos los campos');
        return;
      }
      setLoading(true);
      const contra = Buffer.from(contrase).toString("base64");
      // contraEncrypted = btoa(contra);
      // contra = encryptPassword(contra);

      const response = await axios.post('https://cappro-rrhh-sys.azurewebsites.net/usuario/login', null, {
        params: {
          correo,
          contra,
        }
      })
        .then((response) => {
          window.localStorage.setItem('userId', response.data.idUsuario);
          window.localStorage.setItem('userDNI', response.data.datosPersonales.dni);
          window.localStorage.setItem('userInfo', JSON.stringify(response.data));
          USUARIOLOGEADO.nombre = response.data.datosPersonales.nombres;
          USUARIOLOGEADO.apellidos = response.data.datosPersonales.apellidos;
          USUARIOLOGEADO.rol = response.data.rol
          console.log('Usuarioooo: '+response.data.rol)
        });
      //setIsAuthenticated(true);
      navigate('/menu');
      //console.log(setIsAuthenticated());  
      //navigate('/menu');  
      //console.log(correo, contra, loading, nombre);
    } catch (error) {
      alert('Correo electrónico o contraseña incorrectos.')
      // alert(contra)
    }
    setLoading(false);
  };
  return (
    <div className='login-container'>
      <div className='banner-container'>
        <div className='banner-main'>
          <img src='./images/Recurso1.png' />
          <div>
            <h2 className='banner-h2'>ESCUELA SUPERIOR DE ARTE DRAMÁTICO DE TRUJILLIO</h2>
            <h1 className='banner-h1'>VIRGILIO RODRIGUEZ NACHE</h1>
          </div>
        </div>
        <div className='banner-footer'>
          <h3>Sistema de gestión de Recursos Humanos</h3>
        </div>
      </div>
      <form onSubmit={handleSubmit} className='login-form-container'>
        <div className='login-form-content'>
          <h2 >¡Bienvenido!</h2>
          <div className='controls'>
            <div className='control-container'>
              <p >Usuario:</p>
              <FormControl className='input-login' variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-usuario"
                  value={correo}
                  onChange={(event) => setCorreo(event.target.value)}
                  labelWidth={0}
                />
              </FormControl>

            </div>
            <div className='control-container'>
              <p>Contraseña:</p>
              {/* <TextField style={{paddingLeft: 20}} id="standard-password-input" type="password" autoComplete="current-password"></TextField> */}
              <FormControl style={{ width: '250px' }} variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={contrase}
                  //onChange={handleChange('contra')}
                  onChange={(event) => setContra(event.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        color='primary'
                        edge="end"
                      >
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={0}
                />
              </FormControl>
            </div>
          </div>
        </div>
        <div className={clsx(classes.contenedorboton)}>
          <Button
            className={clsx(classes.boton, classes.tipoletra2)}
            color='primary'
            variant='contained'
            type='submit'
            disabled={loading}
          >
            Ingresar
          </Button>
        </div>
        {loading ? <PageLoader /> : null}
      </form>
    </div>
  );
}
export default Login;