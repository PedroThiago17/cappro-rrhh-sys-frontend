export const JUBILACION = 65;
export const MULTIPLICADOR = 4;
export const VALOR_TIEMPO_COMPLETO = 45;
export const VALOR_TIEMPO_PARCIAL = 24;
export const PORCENTAJE = 0.09;
export const sexoOptions = ['Seleccionar', 'M', 'F'];
export const estadoCivilOptions = ['Seleccionar', 'S', 'C', 'V', 'D'];
export const fondoPensionesOptions = [
  {
    name: 'AFP',
    idDomFondpPen: 7
  },
  {
    name: 'ONP',
    idDomFondpPen: 6
  }
];
export const fondoAfpOptions = [
  {
    idDominio: -1,
    valCadDominio: 'Seleccionar',
    valDecDominio: 0
  },
  {
    idDominio: 8,
    valCadDominio: 'Habitat',
    valDecDominio: 0.1321
  },
  {
    idDominio: 9,
    valCadDominio: 'Integra',
    valDecDominio: 0.1329,
  },
  {
    idDominio: 10,
    valCadDominio: 'Prima',
    valDecDominio: 0.1334,
  },
  {
    idDominio: 11,
    valCadDominio: 'Profuturo',
    valDecDominio: 0.1343,
  },
];


export const mpTableHeaders = ['DNI', 'Nombres', 'Apellidos', 'Codigo Modular', 'Puesto', 'Acciones'];
export const raTableHeaders = ['DNI', 'Nombres', 'Apellidos', 'Fecha', 'Hora Entrada', 'Hora Salida'];
export const raKeys = ['dni', 'nombres', 'apellidos', 'fnacimiento', 'estadoCivil'];
export const mpKeys = ['dni', 'nombres', 'apellidos', 'codModular'];
export const rpKeys = ['mes', 'año', 'dni', 'nombres', 'apellidos'];
export const rpTableHeaders = ['Mes', 'Año', 'DNI', 'Nombres', 'Apellidos', 'Acciones'];
export const  usuariosPlanillas = [
  { mes: 'Diciembre', year: 2022, dni: 999999999, nombres: 'Cristian Omar', apellidos: 'Suclupe Llontop' },
  { mes: 'Diciembre', year: 2022, dni: 999999999, nombres: 'Cristian Omar', apellidos: 'Suclupe Llontop' },
  { mes: 'Diciembre', year: 2022, dni: 999999999, nombres: 'Cristian Omar', apellidos: 'Suclupe Llontop' },
  { mes: 'Diciembre', year: 2022, dni: 999999999, nombres: 'Cristian Omar', apellidos: 'Suclupe Llontop' },
];

const usuariosAsistencia = [
  { dni: 999999999, nombres: 'Nombres', apellidos: 'Apellidos', fecha: '01/12/22', tipo: 'E'},
  { dni: 999999999, nombres: 'Nombres', apellidos: 'Apellidos', fecha: '01/12/22', tipo: 'E'},
  { dni: 999999999, nombres: 'Nombres', apellidos: 'Apellidos', fecha: '01/12/22', tipo: 'E'},
  { dni: 999999999, nombres: 'Nombres', apellidos: 'Apellidos', fecha: '01/12/22', tipo: 'E'},
];

export const INITIAL_FONDO_PENSIONES = [
  {
    valCadDominio: '',
    valDecDominio: 0 | null,
    idDominio: 0
  }
]