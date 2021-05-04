import React from 'react';
import './styles/App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Explorar from './pages/Explorar';
import Comidas from './pages/Comidas';
import Bebidas from './pages/Bebidas';
import Perfil from './pages/Perfil';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/explorar" component={ Explorar } />
        <Route exact path="/bebidas" component={ Bebidas } />
        <Route exact path="/comidas" component={ Comidas } />
        <Route exact path="/perfil" component={ Perfil } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
