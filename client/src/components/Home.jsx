import { Link } from "react-router-dom";
import "../styles/Home.css"
import backgroundImage from "../Images/Back.png"
import todos from "../Images/Todos.png"
import I2 from "../Images/I2.png"
import Vector from "../Images/Vector.svg"

function Home() {
    return(
        <div className="Home" style={{backgroundImage: `url(${backgroundImage})`}}>
            <section>
                <h2 className="biancatext">BIANCA"</h2>
            </section>
            <section className="texto">
                <h1 className="textoHome">
                    Hello <br/>
                    Welcome to <br/> 
                    Redistribution <br/>
                    Algorithm.
                </h1>
            </section>
            <section className="ButtomsHome"> 
                <Link to='/ingruma1' >
                    <button className="Buttoms"><img src={Vector} style={{width: "2rem", height: "2rem", background: '#1D1B26'}} />
                    <p style={{background: 'transparent', paddingTop: '0.5rem', paddingLeft: '1rem'}}>Redistribución Ingruma 1</p></button>
                </Link>
                <Link to='/ingruma2' >
                    <button className="Buttoms"><img src={I2} style={{width: "2rem", background: '#1D1B26'}} />
                    <p style={{background: 'transparent', paddingTop: '0.1rem', paddingLeft: '1rem'}}>Redistribución Ingruma 2</p></button>
                </Link>
                <Link to='/todos'>
                    <button className="Buttoms"><img src={todos} style={{width: "2rem", background: '#1D1B26'}} />
                    <p style={{background: 'transparent', paddingLeft: '1rem'}}>Redistribución todos los <br/>
                        Aptos</p></button>
                </Link>
            </section>
        </div>
    );
}

export default Home;