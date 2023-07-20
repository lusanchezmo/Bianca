
import React, {useState, useEffect } from 'react';

function RedApto() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('idApto');   // <-- obtiene el id del apto
    
    const [dato,setDato] = useState('');
    const [productoId,setProductoId] = useState('');

    if(dato == 0 || productoId == 0){
        console.log('cargando...');
    }else{
        changeProductAmount();
        function changeProductAmount() {
            const options = {
                method: "PUT"
            };
            let url = new URL("http://localhost:5000/changeProductAmount/"+id+"/"+productoId+"/"+dato);
            fetch(url, options) // se hace la consulta 
                .then(response => response.text()) // se obtiene el cuerpo de la respuesta
                .then(data => {
                  
                });
        }
        console.log(dato,productoId);
    }

    

    const [infoApto,setinfoApto] = useState([]);
    
    // Obtiene la info de apto
    function getInfoApto() {
        const options = {
            method: "GET"
        };
        let url = new URL("http://localhost:5000/getAptoById?idApto="+id);
        fetch(url, options) // se hace la consulta 
            .then(response => response.text()) // se obtiene el cuerpo de la respuesta
            .then(data => {
              const json = JSON.parse(data); // se pasa la respuesta de string json a objeto de javascript
              console.log(json);             // se imprime en consola la info
              setinfoApto(json);             // funcion del useState
            });
    }

    // se usa useEffect((),[]) sin parametros para solo hacer una vez la consulta a la BD, 
    // no se debe hacer cada vez que se renderice
    useEffect(() => {
        getInfoApto();
      }, []);

    const [mostrarDiv1, setMostrarDiv1] = useState(false);    // muestra el div para cambiar el nombre

    const toggleDiv1 = () => {                                // intercambia si se da click
        setMostrarDiv1(!mostrarDiv1);
    };

    const [nuevoNombre, setNuevoNombre] = useState('');       // nuevoNombre <-- se almacena el nuevo nombre
    const actualizarNombre = () => {
        changeName();         // <-- llama a la API que cambia el nombre en la bd
    };

    // API que cambia el nombre en la base de datos
    function changeName() {
        const options = {
            method: "PUT"
        };
        let url = new URL("http://localhost:5000/changeName/"+id+"/"+nuevoNombre);
        fetch(url, options) // se hace la consulta 
            .then(response => response.text()) // se obtiene el cuerpo de la respuesta
            .then(data => {
              
            });
    }

    // funcion que almacena el nuevo nombre
    const handleChange1 = (event) => {
        setNuevoNombre(event.target.value);
    };

    const handleClickNombre = () => {
        toggleDiv1();
        actualizarNombre();
     };

    return(
        <div className="redApto">
            <button>Eliminar</button>
            <div>
                <p>{(
                    infoApto == 0 ? (
                    <p>Cargando ...</p> // en caso que no haya cargado 
                ) : (
                infoApto.map((apto) => // se recorre el arreglo para mostrar los elementos
                (
                    <p>{apto.apto}</p>
                )
                )
            ))
            }</p>
                <button onClick={toggleDiv1}>editar</button>
                {mostrarDiv1 && (
                    <div className='showhide1'>
                        <input
                            className='cambioNombre'
                            type="text"
                            placeholder="Nombre"
                            value={nuevoNombre}
                            onChange={handleChange1}
                            name='texto' />
                        <button className='guardarNombre' onClick={handleClickNombre}>Guardar</button>
                    </div>
                )}
                
            </div>

            {/* Apartado de la TABLA */}
            <div className='contenedorProductos'>
            {(
                infoApto == 0 ? (
                    <p>Cargando ...</p> // en caso que no haya cargado 
                ) : (
                    Object.keys(infoApto[0]).map((producto) => // se recorre el arreglo para mostrar los elementos
                (
                    <form style={{display:'flex'}}>
                        <p>{producto}</p>
                        <input
                            type='number'
                            name='dato'
                            placeholder={infoApto[0][producto]}
                            onChange={ev => {
                                setDato(ev.target.value); 
                                setProductoId(producto);
                            }}
                            style={{display:'block'}}
                        ></input>
                    </form>
                )
                )
            ))
            }
            </div>

        </div>
    );
}

export default RedApto;