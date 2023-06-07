import React, { useRef } from 'react'
import { AiOutlineCopy } from 'react-icons/ai'
import './styles/styles.css'
const FotoPasos = ({ dni, codigo }) => {
  const contentRef = useRef(null);
  const copiarAlPortapapeles = async () => {
    const contentElement = contentRef.current;
    if (contentElement) {
      const content = contentElement.innerText;
      await navigator.clipboard.writeText(content);
    }
    alert('El comando fue copiado.');
  }
  return (
    <div className='fp-container'>
      <h2 className='h2-title'>Pasos</h2>
      <div className='fp-content'>
        <p className='' style={{padding:'10px'}}> 1. Copiar el siguiente texto según el sistema operativo </p>
        <div className='fp-pasos'>
          <div className='fp-clipboard'>
            <p style={{padding:'10px'}}> Comando: </p>
            <div className='fp-command' ref={contentRef} onClick={copiarAlPortapapeles} style={{padding:'10px'}} >
              <p>python rrhh_fr.py {codigo} {dni} </p>
              <AiOutlineCopy />
            </div>
          </div>
          
        </div>
        <p style={{padding:'10px'}}> 2. Abrir el Símbolo del sistema de Windows o Terminal en caso de tener Mac </p>
        <p style={{padding:'10px'}}> 3. Pegar el texto copiado según el sistema operativo de su computadora </p>
      </div>
    </div>
  )
}

export default FotoPasos
