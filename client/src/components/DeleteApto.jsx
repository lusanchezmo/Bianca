import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../styles/RedApto.css"

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
        <div className="deleteApto" style={{position:'fixed', zIndex:3}}>
        <h1 className="deleteText">¿Estas seguro que deseas eliminar este apto?</h1>
        <section className="botones" style={{display: 'flex'}}>
        <button className="btnCancelar" >Cancelar</button>
        <Link style={{background: 'transparent'}} to={{pathname: `/${ingruma}`}} >
            <button className="btnCancelar" onClick={deleteApto} >Eliminar</button>
        </Link>
        </section>
        </div>
    )
}

export default DeleteApto;