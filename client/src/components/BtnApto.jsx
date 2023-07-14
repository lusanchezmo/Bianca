import { Link } from "react-router-dom";

function BtnApto(props) {
    return(
        <Link to={{pathname: '/redapto', search: ('?idApto=' + props.apto.idapto) }} >
            <div className="BtnApto">
                <button>{props.apto.apto}</button>   
            </div>
        </Link>
    );
}

export default BtnApto;