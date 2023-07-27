import { PORT } from './config.js'
import { pool } from './db.js'

import express from 'express';
import cors from 'cors';

//const express = require('express');
//const cors = require('cors');

const app = express();

app.use(express.json())

app.use(
  cors({
    origin: "https://lusanchezmo.github.io", // allow requests only from this origin
    origin: "http://localhost:3000"
  })
);


// consulta inicial 
app.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query("select apto, idapto from ingruma2;");
    const resultArray = rows.map(row => {
      return {
        apto: row.apto.toString(), // Convirtiendo el buffer a cadena
        idapto: row.idapto.toString(), // Convirtiendo el buffer a cadena
      };
    });

    res.send(JSON.stringify(resultArray));
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en la consulta');
  }
});

app.get('/getAptoById', async (req, res) => {
  try {
    const id = req.query.idApto;
    const queryResult = await pool.query(`select * from ingruma2 where idapto='${id}';`);
    const result = queryResult[0];

    res.send(JSON.stringify(result));
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en la consulta');
  }
});

app.put('/changeName/:id/:newName', async (req, res) => {
  const { id, newName } = req.params;

  try {
    const result = await pool.query('update ingruma2 set apto = ? where idapto = ?', [newName, id]);
    console.log('esta entrando');
    res.send('correcto');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en la consulta');
  }
});


app.put('/changeProductAmount/:id/:product/:amount', async (req, res) => {
  const { id, product, amount } = req.params;

  try {
    const result = await pool.query(`update ingruma2 set ${product} = ? where idapto = ?`, [amount, id]);
    console.log('esta entrando');
    res.send('correcto');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en la consulta');
  }
});

app.get('/redistributionI2', async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM ingruma2;");
    res.send(JSON.stringify(result[0]));
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en la consulta');
  }
});

app.post('/addApto/:nombre/:torre/:ingruma', async (req, res) => {
  const { nombre, torre, ingruma} = req.params;

  try {
    const result = await pool.query(`insert into ingruma2 (apto,idapto) values (${nombre},'${nombre}.${torre}.${ingruma}');`);
    res.send('correcto');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en la consulta');
  }
});


app.listen(PORT);
console.log("Server on port ", PORT)