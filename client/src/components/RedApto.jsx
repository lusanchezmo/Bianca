
function RedApto(props) {
    return(
        <div className="redApto">
            <button>Eliminar</button>
            <div>
                <p>nombre apto</p>
                <button>editar</button>
                {/* {mostrarDiv1 && (
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
            )} */}
                
            </div>
        </div>
    );
}

export default RedApto;