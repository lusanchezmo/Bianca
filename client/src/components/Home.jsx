import { Link } from "react-router-dom";
function Home() {
    return(
        <div className="Home">
            <Link to='/ingruma1' >
            <button>Ingruma 1</button>
            </Link>
            <Link to='/ingruma2' >
                <button>Ingruma 2</button>
            </Link>
            <Link to='/todos'>
                <button>Todos los Aptos</button>
            </Link>
        </div>
    );
}

export default Home;