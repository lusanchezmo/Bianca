import { Link } from "react-router-dom";
import "../styles/Aptos.css"

function BtnApto(props) {
    return(
        <Link to={{pathname: `/${props.apto.ingruma}/redapto`, search: ('?idApto=' + props.apto.idapto) }} >
            <div className="sectionPro">
                <button className="btnApto">{props.apto.apto}</button>   
            </div>
        </Link>
    );
}

export default BtnApto;