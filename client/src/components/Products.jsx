import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Products() {
    
    let { ingruma } = useParams(); 
    let [products, setProducts] = useState([]);
    let productos = []

    const [mostrarDiv1, setMostrarDiv1] = useState(false);    // muestra el div para cambiar el nombre
    const toggleDiv1 = () => {                                // intercambia si se da click
        setMostrarDiv1(!mostrarDiv1);
    };
    const [nuevoNombre, setNuevoNombre] = useState('');       // nuevoNombre <-- se almacena el nuevo nombre
    const actualizarNombre = () => {
        addProduct();         // <-- llama a la API que cambia el nombre en la bd
    };
    // funcion que almacena el nuevo nombre
    const handleChange1 = (event) => {
      setNuevoNombre(event.target.value);
    };


    // API que agrega un nuevo producto a la base de datos
    function addProduct() {
      const options = {
          method: "POST"
      };
      let url = new URL("http://localhost:5000/addColumnProduct/"+nuevoNombre+"/"+ingruma);
      fetch(url, options) // se hace la consulta 
          .then(response => response.text()) // se obtiene el cuerpo de la respuesta
          .then(data => {
            
          });
    }

    function deleteProduct(produ) {
      const options = {
        method: "DELETE"
      };
      let url = new URL("http://localhost:5000/deleteColumnProduct/"+produ+"/"+ingruma);
      fetch(url, options) // se hace la consulta 
        .then(response => response.text()) // se obtiene el cuerpo de la respuesta
        .then(data => {
        });
    }

    const handleClickNombre = () => {
      toggleDiv1();
      actualizarNombre();
   };


    function getProducts() {
        const options = {
          method: "GET"
        };
        let url = new URL("http://localhost:5000/getProducts/"+ingruma);
        fetch(url, options) // se hace la consulta 
          .then(response => response.text()) // se obtiene el cuerpo de la respuesta
          .then(data => {
            const json = JSON.parse(data);// se pasa la respuesta de string json a objeto de javascript
            console.log(json);
            setProducts(json); // funcion del useState
          });
        }

        useEffect(() => {
          getProducts();
        }, []);

        if(products == 0){
            console.log('cargando...');
        } else {
            products.map((el) => {
                if(el.numero != 'id' && el.numero != 'apto' && el.numero != 'idapto'){
                    productos.push(el.numero)
                }
            })
        }

    return(
        <div>
            {
              (productos === 0 ? (
                <p>Cargando ...</p> // en caso que no haya cargado 
                ) : (
                productos.map((producto,indice) => // se recorre el arreglo para mostrar los elementos
                (   
                    <div className="producto" style={{display: 'flex'}} key={indice}>
                      <p>{producto}</p>
                      <button onClick={ev => {
                        deleteProduct(producto);
                      }} >Eliminar</button>
                    </div>
                )
                )
            ))
            }
            <button onClick={toggleDiv1}>Añadir producto</button>
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
    )
}

export default Products;