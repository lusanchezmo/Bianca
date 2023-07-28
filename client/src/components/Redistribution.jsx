import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Redistribution() {

    // INGRUMA
    let { ingruma } = useParams();
    const [aptos,setAptos] = useState([]);

    function getAptos() {
        const options = {
            method: "GET"
        };
        let url = new URL("http://localhost:5000/redistribution/"+ingruma);
        fetch(url, options) // se hace la consulta 
            .then(response => response.text()) // se obtiene el cuerpo de la respuesta
            .then(data => {
              const json = JSON.parse(data);// se pasa la respuesta de string json a objeto de javascript
            setAptos(json); // funcion del useState
      });
    }

    

    let redistribucionOrdenada = []

    if(aptos == 0){
        console.log('cargando...');
    }else{

    let redistribucion = []
    let apartamentos = []

    Object.keys(aptos[0]).map(el => {
        if(el != 'id' && el !='apto' && el !='idapto' ){
            

    let aptosProductos = []

    aptos.forEach(apto => {
        let aptoProducto = []
        Object.keys(apto).map((producto) => {
            if(producto=='apto'){
                aptoProducto.push(apto[producto]);
                if(!apartamentos.includes(apto[producto])){
                    apartamentos.push(apto[producto]);
                }
            }
            if(producto==el){
                aptoProducto.push(apto[producto])
            }
        })
        aptosProductos.push(aptoProducto)
    })
    
    // Algoritmo de redistribucion 
    let total=0
    for (let sentinela = 0; sentinela < aptosProductos.length; sentinela++){
        total+=aptosProductos[sentinela][1]
    }
    let adecuado=Math.floor(total/aptosProductos.length)
    console.log(adecuado);

    // Ordena la matriz de forma descendente.
    for(let i=1;i<aptosProductos.length; i++){
        for(let j=0;j<(aptosProductos.length - i);j++){
            if(aptosProductos[j+1][1] > aptosProductos[j][1]){
                let mayor = aptosProductos[j+1]
                aptosProductos[j+1] = aptosProductos[j]
                aptosProductos[j] = mayor
            }
        }
    }
    console.log(aptosProductos);

    let j = 0
    let i = (aptosProductos.length - 1)
    let s = 0

    while(i>-1 && s<1000 && j<aptosProductos.length){
        let y = 0
        while(aptosProductos[i][1]<adecuado && aptosProductos[j][1]>adecuado){
            aptosProductos[i][1]+=1
            aptosProductos[j][1]-=1
            y+=1
        }
        if(y!=0){
            let resultado = (`${aptosProductos[i][0]} va por ${y} de ${el} al ${aptosProductos[j][0]}`);
            redistribucion.push(resultado);
            console.log(resultado);
        }
        if(aptosProductos[j][1]==adecuado){
            j+=1
        }
        if(aptosProductos[i][1]==adecuado){
            i-=1
        }
        s++;
    }

    console.log(aptosProductos);

        }
    })


    console.log(redistribucion);
    console.log(apartamentos);


    ///////////////
    apartamentos.map(ap => {

    redistribucion.map(redi => {
        if(redi.split(" ",1) == ap){
            redistribucionOrdenada.push(redi);
        }
    })

    })
    /////////////////////


}   // <-- llave del else

    

    // se usa useEffect((),[]) sin parametros para solo hacer una vez la consulta a la BD, no se debe hacer cada vez que se renderice
    useEffect(() => {
      getAptos();
    }, []);

    return (
        <div className='contenedorProductos'>
            {(
                redistribucionOrdenada == 0 ? (
                    <p>Cargando ...</p> // en caso que no haya cargado 
                ) : (
                    redistribucionOrdenada.map(redi => (
                        <p>{redi}</p>
                    ))
            ))
            }
            </div>
        
    );
}

export default Redistribution;