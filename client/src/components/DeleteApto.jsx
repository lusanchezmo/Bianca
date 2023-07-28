import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function DeleteApto() {
    let { ingruma } = useParams();
    const params = new URLSearchParams(window.location.search);
    const id = params.get('idApto');   // <-- obtiene el id del apto

    function deleteApto() {
        const options = {
            method: "DELETE"
        };
        let url = new URL("http://localhost:5000/deleteApto/"+id+"/"+ingruma);
        fetch(url, options) // se hace la consulta 
            .then(response => response.text()) // se obtiene el cuerpo de la respuesta
            .then(data => {
            });
    }


    return(
        <div style={{position:'fixed', backgroundColor:'red', zIndex:3}}>
        <h1>Estas seguro que deseas eliminar este apto</h1>
        <button >Cancelar</button>
        <Link to={{pathname: `/${ingruma}`}} >
            <button onClick={deleteApto} >Eliminar</button>
        </Link>
        </div>
    )
}

export default DeleteApto;