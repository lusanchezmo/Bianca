
import React, {useState, useEffect } from 'react';
import DeleteApto from './DeleteApto';
import { useParams } from 'react-router-dom';
import "../styles/RedApto.css";
import { Link } from 'react-router-dom';
import cesta from '../Images/cesta.png';
import lapiz from '../Images/lapiz.png'

function RedApto() {
    // Obtenemos el id del apartamento de la URL
    const params = new URLSearchParams(window.location.search);
    const id = params.get('idApto');   // <-- obtiene el id del apto

    //INGRUMA
    let { ingruma } = useParams()

    // Declaramos las variables que vamos a modificar
    // en este caso la cantidad de producto y el producto
    const [dato,setDato] = useState('');                // dato <-- cantidad de producto
    const [productoId,setProductoId] = useState('');    // productoId <-- producto a mofificar cantidad

    // Condicional: Si los datos anteriormente declarados estan vacios,
    // entonces no haga nada, de lo contrario actualice la informacion en la base de datos
    if(dato == 0 || productoId == 0){
        console.log('cargando...');
    }else{
        // Actualiza la cantidad de producto en la base de datos
        changeProductAmount();
        function changeProductAmount() {
            const options = {
                method: "PUT"
            };
            let url = new URL("https://backbianca-production.up.railway.app/changeProductAmount/"+id+"/"+productoId+"/"+dato+"/"+ingruma);
            fetch(url, options) // se hace la consulta 
                .then(response => response.text()) // se obtiene el cuerpo de la respuesta
                .then(data => {
                  
                });
        }
        console.log(dato,productoId);  // imprimimos en la consola del navegador
    }

    
    // Arreglo con la informacion del apartamento 
    // que estamos modificando para la redistribucion 
    const [infoApto,setinfoApto] = useState([]);
    // Obtiene la info del apto
    // ¡ SIEMPRE SE EJECUTA AL INICIO PARA OBTENER NOMBRE DEL APTO !
    function getInfoApto() {
        const options = {
            method: "POST"
        };
        let url = new URL("https://backbianca-production.up.railway.app/getAptoById/"+id+"/"+ingruma);
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


    // TODA ESTA FUNCION ES PARA MODIFICAR EL NOMBRE DEL APTO
    // Este div se muestra solo si damos click en modificar el nombre del apto
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
        let url = new URL("https://backbianca-production.up.railway.app/changeName/"+id+"/"+nuevoNombre+"/"+ingruma);
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

    let apartaInfo = []

    if(infoApto==0){
        console.log('');
    }else{
        let infoApartamento = JSON.parse(JSON.stringify(infoApto))
        console.log(infoApartamento);
        infoApartamento.forEach(element => delete element.id);
        infoApartamento.forEach(element => delete element.apto);
        infoApartamento.forEach(element => delete element.idapto);
        apartaInfo = infoApartamento
    }

    console.log(apartaInfo)


    console.log(infoApto);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          // Puedes enfocar en otro campo o realizar alguna otra acción
          // cuando se presione la tecla Enter en el último campo.
        }
      };

    const [estadoDialog, setEstadoDialog] = useState(false);
    const mostrarDeleteApto = () => {
        setEstadoDialog(!estadoDialog);
    }







    

    return(
        <div className="redApto">

            {/* Apartado de nombre del apto y modificar nombre */}
            {estadoDialog && <DeleteApto mostrarDeleteApto={mostrarDeleteApto} />}
            <div className='NameAptoContainer'>
            <button style={{border: 'none'}} onClick={() => (mostrarDeleteApto())} ><img src={cesta} style={{width: '2rem'}}/></button>
                <p>{(
                    infoApto == 0 ? (
                    <p>Cargando ...</p> // en caso que no haya cargado 
                ) : (
                infoApto.map((apto) => // se recorre el arreglo para mostrar los elementos
                (
                    <p className='nameApto'>{apto.apto}</p>
                )
                )
            ))
            }</p>
                <button style={{border: 'none'}} onClick={toggleDiv1}><img src={lapiz} style={{width: '2.4rem'}} /></button>
                {mostrarDiv1 && (
                    <div className='showhide1'>
                        <input
                            style={{color: 'white'}}
                            className='cambioNombre'
                            type="text"
                            placeholder="Nuevo nombre"
                            value={nuevoNombre}
                            onChange={handleChange1}
                            name='texto' />
                        <button className='guardarNombre' onClick={handleClickNombre}>Guardar</button>
                    </div>
                )}
                
            </div>

            {/* Apartado de la TABLA para la redistribucion*/}
            <div className='contenedorProductos'>
            {(
                apartaInfo == 0 ? (
                    <p>Cargando ...</p> // en caso que no haya cargado 
                ) : (
                    Object.keys(apartaInfo[0]).map((producto) => // se recorre el arreglo para mostrar los elementos
                (
                    <form style={{display:'flex'}}>
                        <p className='nombreProducto'>{producto}</p>
                        <input
                            className='entradaDato'
                            type='number'
                            name='dato'
                            placeholder={apartaInfo[0][producto]}
                            onChange={ev => {
                                setDato(ev.target.value); 
                                setProductoId(producto);    // productoId <-- nombre del producto
                            }}
                            onKeyPress={handleKeyPress}
                        ></input>
                    </form>
                )
                )
            ))
            }
            </div>

            <Link to={{pathname: `/${ingruma}`}}>
                <button className='botonListo'>Listo</button>
            </Link>

        </div>
    );
}

export default RedApto;