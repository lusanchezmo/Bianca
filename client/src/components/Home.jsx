import { Link } from "react-router-dom";
function Home() {
    return(
        <div className="Home">
            <button>Ingruma 1</button>
            <Link to='/ingruma2' >
                <button>Ingruma 2</button>
            </Link>
            <button>Todos los Aptos</button>
        </div>
    );
}

export default Home;