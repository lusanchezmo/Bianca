import './App.css';
import React, {Component} from 'react';
import {BrowserRouter ,Route, Routes} from "react-router-dom";
import Home from './components/Home';
import Aptos from './components/Aptos';
import NotFound from './components/NotFound';
import RedApto from './components/RedApto';
import Redistribution from './components/Redistribution';
import Products from './components/Products';

function App() {
  return (
    <BrowserRouter basename='/FrontBianca'>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path=':ingruma' element={<Aptos/>} />
        <Route path=':ingruma/redapto' element={<RedApto/>} />
        <Route path='redistribution/:ingruma' element={<Redistribution/>} />
        <Route path=':ingruma/productos' element={<Products/>} />
        <Route path='*' element={<NotFound />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
