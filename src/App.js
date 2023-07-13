import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Formulario from './components/Formulario';
import './index.css';

function App() {

  const [listaPaises, setAllPaises] = useState([]);
  const [paisRandom, setPaisRandom] = useState({});
  const [puntos, setPuntos] = useState(0)
  const [ayuda, setAyuda] = useState("")
  const [letrasMostradas, setLetrasMostradas] = useState(0);

  const [secondsLeft, setSecondsLeft] = useState(15);



  const SetRandomCountry = () => {
    setLetrasMostradas(0)
    let botonAyuda = document.querySelector('#ayuda');
    botonAyuda.disabled = false
    botonAyuda.style.opacity = 1;
    setAyuda("")
    setSecondsLeft(15)
    let numRandom = Math.floor(Math.random() * 220);
    setPaisRandom(listaPaises[numRandom])
  }


  const CargarPaises = () => {
    axios
      .get("https://countriesnow.space/api/v0.1/countries/flag/images")
      .then((result) => {

        let array = result.data.data
        setAllPaises(array)

      }).catch((error) => {
        console.log(error);
      });

  }

  useEffect(() => {
    CargarPaises()

  }, [])



  useEffect(() => {

    if (listaPaises.length > 0) {


      SetRandomCountry()

      return;
    }

  }, [listaPaises])




  function CheckAnswer(e) {


    e.preventDefault();
    let nombreInsertado = e.target.nombrePais.value

    if (nombreInsertado.toLowerCase() === (paisRandom.name).toLowerCase()) {

      SaltarMensaje(1)
      setPuntos(puntos + 10 + secondsLeft)

      SetRandomCountry()

    } else {

      SaltarMensaje(0)
      setPuntos(puntos - 1)
      SetRandomCountry()


    }
    e.target.nombrePais.value = ""
    setSecondsLeft(15)

  }


  const SaltarMensaje = (numero) => {

    const mensaje = document.getElementById('mensaje');

    mensaje.textContent = numero === 0 ? 'INCORRECTO' : 'CORRECTO';

    if (numero === 3) {
      mensaje.textContent = 'SIN TIEMPO'
    }

    mensaje.style.backgroundColor = numero === 1 ? 'green' : 'red'
    mensaje.style.display = 'block';

    let randomX = Math.floor(Math.random() * window.innerWidth - 20);
    let randomY = Math.floor(Math.random() * window.innerHeight - 20);
    mensaje.style.left = `${randomX}px`;
    mensaje.style.top = `${randomY}px`;

    setTimeout(() => {
      mensaje.style.display = 'none';
    }, 2000);



  }

  useEffect(() => {

    if (letrasMostradas === 3) {
      let botonAyuda = document.querySelector('#ayuda');
      botonAyuda.style.opacity = 0.5;
      botonAyuda.disabled = true

    }


  }, [letrasMostradas])


  const PedirAyuda = () => {



    if (letrasMostradas < 3) {

      let letra = CrearAyuda(paisRandom.name)

      setAyuda([...ayuda, " ", letra])


      setSecondsLeft(secondsLeft - 2)

    }



  }


  function AgregarGuiones() {
    if (paisRandom.name != null) {
      let letrasRestantes = paisRandom.name.length - letrasMostradas
      let guionesRestantes = "";

      for (let i = 0; i < letrasRestantes; i++) {

        guionesRestantes += "- "

      }
      return guionesRestantes;

    }
  }


  const CrearAyuda = (pais) => {

    let largoPais = pais.length
    let letraAMostrar = ""

    if (letrasMostradas < largoPais) {

      letraAMostrar = pais[letrasMostradas]
      setLetrasMostradas(letrasMostradas + 1)


    }

    return letraAMostrar !== "" ? letraAMostrar.toUpperCase() : null

  }


  const BajarSegundos = () => {
    setSecondsLeft(secondsLeft - 1);

  }

  useEffect(() => {

    if (secondsLeft > 0) {

      const interval = setInterval(() => {

        BajarSegundos()

      }, 1000);

      return () => clearInterval(interval);


    } else {

      SetRandomCountry()
      SaltarMensaje(3)
      setPuntos(puntos - 1)

    }



  });

  return (
    <>

      <div className='container'>
        <p style={{ color: 'white', fontSize: '25px' }} id='intervalo'>Tiempo restante: <span className='TextoColor'>{secondsLeft}</span></p>
        <img src={paisRandom.flag} alt='flag' className='flagImg'></img>
        <p className='LetrasAyuda'>{ayuda} {AgregarGuiones()}</p>

        <Formulario onCheckAnswer={CheckAnswer} onSaltarMensaje={SaltarMensaje} />

        <h1 id='puntos'>PUNTOS: <span className='TextoColor'>{puntos}</span></h1>
        <div id="mensaje" className="mensaje"></div>
        <button type='submit' id='ayuda' className='button' onClick={() => PedirAyuda()}>Ayuda</button>

      </div>
    </>
  );
}

export default App;
