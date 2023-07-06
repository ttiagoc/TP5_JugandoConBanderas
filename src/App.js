import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [listaPaises, setAllPaises] = useState([]);
  const [paisRandom, setPaisRandom] = useState({ flag: "https://img.tapimg.net/market/images/5f49418a4764b717ee0cee8bdd7c02fd.jpg?imageView2/0/w/720/h/405/q/80/format/jpg/interlace/1/ignore-error/1" });
  const [puntos, setPuntos] = useState(0)
  const [ayuda, setAyuda] = useState("")
  const [letrasMostradas, setLetrasMostradas] = useState([]);
  
  const [secondsLeft, setSecondsLeft] = useState(15);
 


  const SetRandomCountry = () => {

    setSecondsLeft(15)


    let numRandom = Math.floor(Math.random() * 220);

    setPaisRandom(listaPaises[numRandom])
    console.log(listaPaises[numRandom].name)
   
    return;

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
    let aMostrar = document.querySelector('#gameUtilities')
    let aMostrar2 = document.getElementById('puntos')
    let aMostrar3 = document.getElementById('ayuda')
    let inter = document.getElementById('intervalo')

    aMostrar.style.display = 'none'
    aMostrar2.style.display = 'none'
    aMostrar3.style.display = 'none'
    inter.style.display = 'none'

  }, [])


  function ComenzarJuego() {

    setSecondsLeft(15)

    SetRandomCountry()
    let inter = document.getElementById('intervalo')
    let ocultar = document.querySelector('#startButton');
    let aMostrar = document.querySelector('#gameUtilities')
    let aMostrar2 = document.getElementById('puntos')
    let aMostrar3 = document.getElementById('ayuda')
    ocultar.style.display = 'none'
    aMostrar.style.display = 'block'
    aMostrar2.style.display = 'block'
    aMostrar3.style.display = 'block'
    inter.style.display = 'block'

  }



  function CheckAnswer(e) {
    console.log(e)
 
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

    mensaje.textContent = numero == 0 ? 'INCORRECTO' : 'CORRECTO';
    mensaje.style.backgroundColor = numero == 1 ? 'green' : 'red'
    mensaje.style.display = 'block';

    let randomX = Math.floor(Math.random() * window.innerWidth - 20);
    let randomY = Math.floor(Math.random() * window.innerHeight - 20);
    mensaje.style.left = `${randomX}px`;
    mensaje.style.top = `${randomY}px`;

    setTimeout(() => {
      mensaje.style.display = 'none';
    }, 2000);



  }

  const PedirAyuda = () => {
   let newLetra = CrearAyuda(paisRandom.name)
  let textoAyuda = paisRandom.name.split('').map((newLetra, index) => (letrasMostradas.includes(index) ? newLetra : '-')).join('')
   console.log(textoAyuda)
   setAyuda(textoAyuda)
  }


  const CrearAyuda = (pais) => {

    console.log("Pais: " + pais)

    if (letrasMostradas.length < pais.length) {
      const indiceAleatorio = Math.floor(Math.random() * pais.length);
     

      if (!letrasMostradas.includes(indiceAleatorio)) {
        setLetrasMostradas([...letrasMostradas, indiceAleatorio]);
      } else {
         CrearAyuda(); 
      }

   
    }
  };




  




  const BajarSegundos = () => {
    setSecondsLeft(secondsLeft - 1);
    
  }

  useEffect(() => {

    if (secondsLeft > 0) {
      
      const interval = setInterval(() => {
     
         BajarSegundos()

      }, 1000);

      return () => clearInterval(interval);


    }else{
      setPuntos(puntos-1)
      SetRandomCountry()
    }

      
        
    });

  return (
    <>

      <div className='container'>
      <p style={{color:'white', fontSize:'25px'}} id='intervalo'>Tiempo restante: {secondsLeft}</p>
        <img src={paisRandom.flag} alt='flag' className='flagImg'></img>

        <button onClick={() => ComenzarJuego()} className='startButton' id='startButton'>Empezar</button>


        <form onSubmit={(e) => CheckAnswer(e)}>

          <div className='container2' id='gameUtilities'>
            <input type='text' name='nombrePais' placeholder='Adivina el nombre' autoComplete='off'></input>
            <button type='submit' className='button' onClick={() => SaltarMensaje()}>Enviar</button>
          </div>
        </form>


        <h1 id='puntos'>PUNTOS: {puntos}</h1>
        <div id="mensaje" className="mensaje"></div>
        <button type='submit' id='ayuda' className='button' onClick={() => PedirAyuda()}>Ayuda</button>

           
         



      </div>
    </>
  );
}

export default App;
