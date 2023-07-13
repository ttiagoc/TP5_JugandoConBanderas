import React from 'react'
import '../index.css';

import PropTypes from 'prop-types'

export default function Formulario({ onCheckAnswer}) {
  return (
    <>

      <form onSubmit={(e) => onCheckAnswer(e)}>

        <div className='container2' id='gameUtilities'>
          <input type='text' name='nombrePais' placeholder='Adivina el nombre' autoComplete='off'></input>
          <button type='submit' className='button'>Enviar</button>
        </div>
      </form>


    </>
  )
}

Formulario.propTypes = {
  chequearRespuesta: PropTypes.func,
  darAyuda: PropTypes.func
}