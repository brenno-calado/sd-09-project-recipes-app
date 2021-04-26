import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <div className="meals">
        <span className="logo">TRYBE</span>
        <object
          className="rocksGlass"
          type="image/svg+xml"
          data={ rockGlass }
        >
          Glass
        </object>
      </div>
      <Switch>
        <Route path="/comidas" />
        <Route path="/comidas/:id" />
        <Route path="/comidas/:id/in-progress" />
        <Route path="/bebidas" />
        <Route path="/bebidas/:id" />
        <Route path="/bebidas/:id/in-progress" />
        <Route path="/explorar" />
        <Route path="/explorar/bebidas" />
        <Route path="/explorar/comidas" />
        <Route path="/explorar/bebidas/ingredientes" />
        <Route path="/explorar/comidas/ingredientes" />
        <Route path="/explorar/comidas/area" />
        <Route path="/perfil" />
        <Route path="/receitas-feitas" />
        <Route path="/receitas-favoritas" />
        <Route exact path="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
