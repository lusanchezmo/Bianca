import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from './components/Home';
import Aptos from './components/Aptos';
import NotFound from './components/NotFound';
import RedApto from './components/RedApto';
import Redistribution from './components/Redistribution';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/ingruma2' element={<Aptos/>} />
        <Route path='/redapto' element={<RedApto/>} />
        <Route path='/redistribution' element={<Redistribution/>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
