import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [listaPaises, setAllPaises] = useState([]);
  const [paisRandom, setPaisRandom] = useState({});
  const [puntos, setPuntos] = useState(0)

  // let aOcultar = document.querySelector("#ocultar")
  //  aOcultar.style.display = 'none';
  



  function SetRandomCountry(){
 
    let numRandom = Math.floor(Math.random() * 220);
    setPaisRandom(listaPaises[numRandom])
    
  }

  useEffect(() => {
  axios
  .get("https://countriesnow.space/api/v0.1/countries/flag/images")
  .then((result) => {

    let array = result.data.data
    setAllPaises(array)
    
  })
   .catch((error) => {
    console.log(error);
  });


 

  },[]);




  function checkAnswer(e){
     e.preventDefault();
      let nombreInsertado = e.target.nombrePais.value
     
      if (nombreInsertado.toLowerCase() === (paisRandom.name).toLowerCase()) {
        setPuntos(puntos+10)
        SetRandomCountry()
        return console.log("bien")
      }else{
    
        setPuntos(puntos-1)
        return console.log("mal")
      }
  }
  console.log(paisRandom.name)

  return (
    <>
    
    <div className='container'>
      <img src = {paisRandom.flag}  alt='flag' className='flagImg' id='ocultar' ></img>
      
      <button onClick={() =>  SetRandomCountry()} className='button'>Empezar</button>
    

      <form onSubmit={(e) => checkAnswer(e)} >

        <div className='container2'>
        <input type='text' name='nombrePais' placeholder='adivina el nombre' id='ocultar'></input>
        <button type='submit' className='button' id='ocultar'>Enviar</button>
        </div>
      </form>
      <h1 id='ocultar'>puntos: {puntos}</h1>
      </div>
    </>
  );
}

export default App;
