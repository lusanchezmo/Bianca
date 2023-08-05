import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import "../styles/Aptos.css"

function AddApto() {

    const [nombre, setNombre] = useState('');
    const [torre, setTorre] = useState('');
    const [numIngruma, setNumIngruma] = useState('');

    let { ingruma } = useParams();
    
    function enviarDatos() {
        const options = {
            method: "POST"
        };
        let url = new URL("https://backbianca-production.up.railway.app/addApto/"+nombre+"/"+torre+"/"+numIngruma+"/"+ingruma);
        fetch(url, options) // se hace la consulta 
            .then(response => response.text()) // se obtiene el cuerpo de la respuesta
            .then(data => {
              
            });
    }
    
    return (
        <form className="addApto" style={{position:'fixed', zIndex:3}}>
            <button className="close">X</button>
            <h1 className="addText">Agregar nuevo apartamento</h1>

            <section className="container">
            <div className="datosContainer">
                <p className="nameDatos">Nombre del apto:</p>
                <input 
                    className="inputDatos"
                    type="text" 
                    name="nombre"
                    onChange={ev => {setNombre(ev.target.value)}} />
            </div>
            <div className="datosContainer">
                <p className="nameDatos">Torre al que pertenece:</p>
                <input 
                    className="inputDatos"
                    type="number"
                    name="torre"
                    onChange={ev => {setTorre(ev.target.value)}} />
            </div>
            <div className="datosContainer">
                <p className="nameDatos">Ingrma al que pertenece:</p>
                <input 
                    className="inputDatos"
                    type="number" 
                    name="ingruma"
                    onChange={ev => {setNumIngruma(ev.target.value)}} />
            </div>
            </section>

            <input className="addButtom" type="submit" value="Añadir" onClick={enviarDatos} />
        </form>
    )
}

export default AddApto;