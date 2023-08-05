import React, { useState, useEffect } from 'react';
import BtnApto from './BtnApto';
import AddApto from './AddApto';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import "../styles/Aptos.css"
import Image from "../Images/Todos.png"

function Aptos() {

  //INGRUMA
  let { ingruma } = useParams()
  console.log(ingruma);

  //Array con los apartamentos
  const [aptos,setAptos] = useState([]);

  //
  const [estadoDialog, setEstadoDialog] = useState(false);
  const mostrarAddApto = () => {
    setEstadoDialog(!estadoDialog);
  }

  function getAptos() {
    const options = {
      method: "POST"
    };
    let url = new URL("https://backbianca-production.up.railway.app/"+ingruma);
    fetch(url, options) // se hace la consulta 
      .then(response => response.text()) // se obtiene el cuerpo de la respuesta
      .then(data => {
        const json = JSON.parse(data);// se pasa la respuesta de string json a objeto de javascript
        console.log(json);
        setAptos(json); // funcion del useState
      });
    }

    // se usa useEffect((),[]) sin parametros para solo hacer una vez la consulta a la BD, no se debe hacer cada vez que se renderice
    useEffect(() => {
      getAptos();
    }, []);

  return (
    <div className="Aptos">
       {estadoDialog && <AddApto mostrarAddApto={mostrarAddApto} />}
      <section>
        <h2 className="biancatext">BIANCA"</h2>
      </section>
      <section className='sectionPro'>
        <h1 className="textRedi">Redistribución</h1>
        <Link to={{pathname: `/${ingruma}/productos`}} > 
          <button className='ButtomPro'><img src={Image} style={{width: "2rem", background: '#1D1B26', paddingRight: '1rem', paddingTop: '0.3rem'}} />
            Productos a
            <br/> redistribuir
          </button>
        </Link>
      </section>
      <section className='sectionPro'>
      <h2 className='aptosText'>Aptos</h2>
      <div className='sectionPro'>
        {
          (aptos === 0 ? (
            <p>Cargando ...</p> // en caso que no haya cargado 
            ) : (
            aptos.map((apto) => // se recorre el arreglo para mostrar los elementos
            (
                <BtnApto apto={apto} />
            )
            )
        ))

        }
      <div><button className='addAptobtn' onClick={() => (mostrarAddApto())}>X</button></div>
      </div>
      </section>
      <section className='sectionPro'>
        <h2 className='textMakeRedi'>Hacer redistribución</h2>
        <Link to={{pathname: `/redistribution/${ingruma}`}}>
          <button className='btnRedistribution'>Redistribution</button>
        </Link>
      </section>
    </div>
  );
}

export default Aptos;
