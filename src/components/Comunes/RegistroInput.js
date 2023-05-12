import React, { useState } from 'react'



const RegistroInput = ({ label, type, options }) => {
  const [dni, setDni] = useState('');
  const [telefono, setTelefono] = useState('');
  const [experiencia, setExperiencia] = useState('');
  const [pago, setPago] = useState('');
  const [codigoModular, setCodigoModular] = useState('');


  const handleNumberChange = (e, limit) => {
    const value = e.target.value;
    const name = e.target.name;

    const newValue = value.replace(/[^0-9]/g, '').substring(0, limit);

    if (name === 'dni') {
      setDni(newValue)
    }
    if (name === 'experiencia') {
      setExperiencia(newValue)
    }
    if (name === 'codigo_modular') {
      setCodigoModular(newValue)
    }
    else {
      setTelefono(newValue)
    }
  }

  const handleText = (e) => {
    const value = e.target.value;
    setPago(value);
  }

  return (
    <div className='input-container'>
      {
        type === 'select' ?
          <>
            <label htmlFor=""> {label} </label>
            <select className='select-input' name="" id="" /* required */>
              {
                options.map((op, index) => (
                  <option key={index} value=""> {op} </option>
                ))
              }
            </select>
          </>

          :
          label === 'DNI:' ?
            <>
              <label htmlFor=""> {label} </label>
              <input
                name='dni'
                type='text'
                /* required */
                value={dni}
                onChange={(e) => handleNumberChange(e, 8)} />

            </>

            :

            label === 'Dirección:' ?
              <>
                <label htmlFor=""> {label} </label>
                <input type='text' maxLength='100' />

              </>

              :

              label === 'Teléfono / Celular:' ?
                <>
                  <label htmlFor=""> {label} </label>
                  <input name='telefono' type='text' /* required */ value={telefono} onChange={(e) => handleNumberChange(e, 9)} />

                </>
                :

                  label === 'Fecha de Ingreso:' ?
                    <>
                      <label htmlFor=""> {label} </label>
                      <input type='date' readOnly defaultValue={new Date().toISOString().substring(0, 10)} />

                    </>

                    :

                    label === 'Años de experiencia:' ?
                      <>
                        <label htmlFor=""> {label} </label>
                        <input name='experiencia' type='text' value={experiencia} onChange={(e) => handleNumberChange(e, 2)} />

                      </>

                      :

                      label === 'Años de experiencia:' ?
                        <>
                          <label htmlFor=""> {label} </label>
                          <input type='number' /* required */ />

                        </>

                        :

                        label === 'Código modular:' ?
                          <>
                            <label htmlFor=""> {label} </label>
                            <input type='text' name='codigo_modular' value={codigoModular} /* required */ onChange={(e) => handleNumberChange(e, 9)} />
                          </>

                          :

                           label === 'Pago neto:' ?
                            <>
                              <label htmlFor=""> {label} </label>
                              <input type='number' step="any" onChange={handleText} value={pago} min={0} />
                            </>

                            :

                            label === 'Lugar de nacimiento:' ?
                              <>
                                <label htmlFor=""> {label} </label>
                                <input type='text' maxLength='50' />
                              </>

                              :

                              label === 'Especialidad:' ?
                                <>
                                  <label htmlFor=""> {label} </label>
                                  <input type='text' maxLength='50' /* required */ />
                                </>

                                :

                                <>
                                  <label htmlFor=""> {label} </label>
                                  <input type='text' maxLength='60' /* required */ onChange={handleText} />
                                </>
      }

    </div>

  )
}
export default RegistroInput