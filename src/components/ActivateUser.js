import React, { useEffect, useState } from 'react'
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
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Buffer } from 'buffer';
import { ClipLoader } from "react-spinners";
import PageLoader from './Loading';
import NavBar from './MenuPrincipal/NavBar';
import USUARIOLOGEADO from '../Global/Globals';
import VALIDAR from '../Global/Validar'

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

const ActivateUser = ({ setIsAuthenticated }) => {
  const { emailb64 } = useParams();
  const classes = useStyles();
  const [values, setValues] = React.useState({
    showPassword: false,
  });
  const [usuario, setUsuario] = React.useState({
    correo: '',
    contra: '',
  });
  const [correo, setCorreo] = useState('');
  const [validatePassword, setValidatePassword] = useState('');
  const [contrase, setContra] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('email: ', emailb64)
    const decodedEmail = Buffer.from(emailb64, 'base64').toString('ascii')
    console.log('decoded: ', decodedEmail)
    setCorreo(decodedEmail);
  }, [])

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {

      if (!validatePassword || !contrase) {
        alert('Por favor, complete todos los campos');
        return;
      }
      if (contrase != validatePassword) {
        alert('Las contraseñas no coinciden');
        return;
      }
      setLoading(true);

      const contra = Buffer.from(contrase).toString("base64");

      console.log('datos enviados: ', {
        correo,
        contraB64: contra
      })

      const res = await axios.put(`https://cappro-rrhh-sys.azurewebsites.net/usuario/activacionUsuarioNuevo?correo=${correo}&contraB64=${contra}`)
      console.log('response: ', res.data)
      setLoading(false);
      alert('La autenticación fue correcta.');
      navigate('/');

    } catch (error) {
      console.log({ message: error.data });
    }

  };
  return (
    <div className={clsx(classes.root)}>
      <div className={clsx(classes.divisionpantallas)} style={{ backgroundColor: "#0066CC" }}>
        <div className={clsx(classes.color2, classes.titulo)}>
          <img className={clsx(classes.logo)} src='/images/Recurso1.png' />
          <h2 style={{ textTransform: "uppercase", margin: 0 }} className={clsx(classes.tipoletra1)}>escuela superior de arte dramático de trujillo</h2>
          <h1 className={clsx(classes.h1, classes.tipoletra1)}>virgilio rodriguez nache</h1>
          <h3 className={clsx(classes.h3, classes.tipoletra1)}>Sistema de gestión</h3>
          <h3 className={clsx(classes.h3, classes.tipoletra1)}>de Recursos Humanos</h3>
        </div>
      </div>
      <form className={clsx(classes.color1, classes.divisionpantallas)} onSubmit={handleSubmit}>
        <div>
          <h2 style={{ textAlign: 'center', marginTop: 300, fontSize: 50 }} className={clsx(classes.tipoletra2)} >Activa tu cuenta</h2>
          <div>
            <div className={clsx(classes.formulario)} style={{ marginBottom: 10 }}>
              <img className={clsx(classes.icono)} src='/images/Recurso3.png' />
              <p className={clsx(classes.tipoletra2)}>Contraseña:</p>
              <FormControl style={{ marginLeft: 37 }} className={clsx(classes.margin, classes.textField)} variant="outlined">
                <OutlinedInput
                  className={clsx(classes.tamanoLabel)}
                  id="outlined-adornment-password1"
                  type={values.showPassword ? 'text' : 'password'}
                  value={validatePassword}
                  onChange={(event) => setValidatePassword(event.target.value)}
                  labelWidth={0}
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
                />
              </FormControl>
            </div>
            <div className={clsx(classes.formulario)}>
              <img className={clsx(classes.icono)} src='/images/Recurso3.png' />
              <p className={clsx(classes.tipoletra2)}>Repita la contraseña:</p>
              <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                <OutlinedInput
                  className={clsx(classes.tamanoLabel)}
                  id="outlined-adornment-password2"
                  type={values.showPassword ? 'text' : 'password'}
                  value={contrase}
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
            Autenticar
          </Button>
        </div>
        {loading ? <PageLoader /> : null}
      </form>
    </div>
  );
}
export default ActivateUser;