const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json())

app.use(
    cors({
      origin: "http://localhost:3000", // allow requests only from this origin
    })
  );

app.get('/',(req,res) => {

    var conn = require('./db.js');  // !!INCLUIR SIEMPRE!!  se incluye archivo db.js
    var con = conn.con();           // se llama la función createConection(), se almacena en con, esta es una variable para realizar la conección

    con.connect(function (err) {    // se abre la conexion con la db
        if (err) throw err;         // validacion de apertura
        con.query("select apto,idapto from ingruma2;", function (err, result, fields) { // se envía la petición a DB

            if (err) throw err;  // valida peticion enviada corrrectamente
            res.send(JSON.stringify(result));    // se imprime en pantalla el resultado de la consulta

        });
    });
});

app.listen(5000);
console.log('server on port 5000');