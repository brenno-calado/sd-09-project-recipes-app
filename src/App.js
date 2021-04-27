import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';
import Login from './Pages/Login';
import Explore from './Pages/Explore';
import Drinks from './Pages/Drinks';
import Food from './Pages/Food';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/comidas" component={ Food } />
        <Route path="/bebidas" component={ Drinks } />
        {/* <Route path="/comidas/{id-da-receita}" component={ Login } />
        <Route path="/bebidas/{id-da-receita}" component={ Login } />
        <Route path="/comidas/{id-da-receita}/in-progress" component={ Login } />
        <Route path="/bebidas/{id-da-receita}/in-progress" component={ Login } /> */}
        <Route path="/explorar" component={ Explore } />
        {/* <Route path="/explorar/comidas" component={ Login } />
        <Route path="/explorar/bebidas" component={ Login } />
        <Route path="/explorar/comidas/ingredientes" component={ Login } />
        <Route path="/explorar/bebidas/ingredientes" component={ Login } />
        <Route path="/explorar/comidas/area" component={ Login } />
        <Route path="/perfil" component={ Login } />
        <Route path="/receitas-feitas" component={ Login } />
        <Route path="/receitas-favoritas" component={ Login } /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
