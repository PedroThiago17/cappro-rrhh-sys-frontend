import axios from "axios";

export const calcularEdad = (fechaNacimiento) => {
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);

  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();

  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  return edad;
}

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function calcularAñoJubilacion(fechaNacimiento) {
  const fechaActual = new Date();
  const partesFecha = fechaNacimiento.split('-');
  const añoNacimiento = parseInt(partesFecha[0]);
  
  const edad = fechaActual.getFullYear() - añoNacimiento;
  const añoJubilacion = añoNacimiento + 65;
  
  return añoJubilacion;
}

export const downloadPdf = async (planillaId, dni)=> {
  const res = await axios.get(`https://cappro-rrhh-sys.azurewebsites.net/boletas/generarBoletaPdf/${planillaId}`, { responseType: 'blob' });
  const blob = new Blob([res.data], { type: 'application/pdf' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Boleta - ${dni}.pdf`;
  link.click();
  window.URL.revokeObjectURL(url);
}