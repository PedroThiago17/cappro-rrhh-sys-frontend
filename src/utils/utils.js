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