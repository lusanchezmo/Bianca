import { useState, useEffect } from "react";

function AddApto() {

    const [nombre, setNombre] = useState('');
    const [torre, setTorre] = useState('');
    const [ingruma, setIngruma] = useState('');
    
    function enviarDatos() {
        const options = {
            method: "POST"
        };
        let url = new URL("http://localhost:5000/addApto/"+nombre+"/"+torre+"/"+ingruma);
        fetch(url, options) // se hace la consulta 
            .then(response => response.text()) // se obtiene el cuerpo de la respuesta
            .then(data => {
              
            });
    }
    
    return (
        <form className="addApto" style={{position:'fixed', backgroundColor:'red', zIndex:3}}>
            <button>X</button>
            <h1>Agregar nuevo apartamento</h1>
            <p>Nombre del apto</p>
            <input 
                type="text" 
                name="nombre"
                onChange={ev => {setNombre(ev.target.value)}} />
            <p>Torre al que pertenece</p>
            <input 
                type="number"
                name="torre"
                onChange={ev => {setTorre(ev.target.value)}} />
            <p>Ingrma al que pertenece</p>
            <input 
                type="number" 
                name="ingruma"
                onChange={ev => {setIngruma(ev.target.value)}} />
            <input type="submit" value="Listo" onClick={enviarDatos} />
        </form>
    )
}

export default AddApto;