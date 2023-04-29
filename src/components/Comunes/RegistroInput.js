import React from 'react'

const RegistroInput = ({ label, type, options }) => {
  return (
    <div className='input-container'>
      {
        type === 'select' ?
          <>
            <label htmlFor=""> {label} </label>
            <select className='select-input' name="" id="" required>
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
            <input type='number' required min='10000000' max='99999999'/>
            
          </>
          
          :

        label === 'Dirección:' ?
          <>
            <label htmlFor=""> {label} </label>
            <input type='text' maxLength='100'/>
            
          </>
          
          :

        label === 'Edad:' ?
          <>
            <label htmlFor=""> {label} </label>
            <input type='number' id='edad' readOnly

            />
            
          </>
          
          :

          label === 'Fecha de nacimiento:' ?
          <>
            <label htmlFor=""> {label} </label>
            <input type='date' required id='fechaNacimiento' min='31/12/1958'/>
          </>
          
          :

          label === 'Teléfono / Celular:' ?
          <>
            <label htmlFor=""> {label} </label>
            <input type='tel' required min='044000000' max='999999999'/>
            
          </>
                    
          :

          label === 'Correo Personal:' ?
          <>
            <label htmlFor=""> {label} </label>
            <input type='email'/>
            
          </>
                    
          :

          label === 'Fecha de Ingreso:' ?
          <>
            <label htmlFor=""> {label} </label>
            <input type='date'/>
            
          </>
          
          :

          label === 'Años de experiencia:' ?
          <>
            <label htmlFor=""> {label} </label>
            <input type='number' min='0' max='75'/>
            
          </>
          
          :

          label === 'Años de experiencia:' || label === 'Años de jubilación:' ?
          <>
            <label htmlFor=""> {label} </label>
            <input type='number' required/>
            
          </>
          
          :

          label === 'Código modular:'?
          <>
            <label htmlFor=""> {label} </label>
            <input type='number' required/>
            
          </>
          
          :

          label === 'Carga horaria:' ?
          <>
            <label htmlFor=""> {label} </label>
            <input type='number' readOnly required/>
            
          </>
          
          :

          label === 'Pago bruto:' || label === 'Pago por hora:' || label === 'Pago neto:' || label === 'Descuento de pensiones:' ?
          <>
            <label htmlFor=""> {label} </label>
            <input type='number' readOnly/>
            
          </>
          
          :

          <>
            <label htmlFor=""> {label} </label>
            <input type='text' maxLength='60' required/>
          </>
      }

    </div>

  )
}


export default RegistroInput