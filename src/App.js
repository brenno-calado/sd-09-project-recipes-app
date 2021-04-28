import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Perfil from './pages/Perfil';
import Bebidas from './pages/Drinks';
import Explorar from './pages/Explorar';
import ExplorarComidas from './pages/ExplorarComidas';
import ExplorarBebidas from './pages/ExplorarBebidas';
import ExplorarIngredientesComida from './pages/ExplorarIngredientesComida';
import ExplorarIngredientesBebida from './pages/ExplorarIngredientesBebida';
import ExplorarComidasPorOrigem from './pages/ExplorarComidasPorOrigem';
import ReceitasFeitas from './pages/ReceitasFeitas';
import ReceitasFavoritas from './pages/ReceitasFavoritas';
import Comidas from './pages/Meals';
import Details from './components/Details';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Switch>
      <Route
        path="/explorar/comidas/ingredientes"
        component={ ExplorarIngredientesComida }
      />
      <Route
        path="/explorar/bebidas/ingredientes"
        component={ ExplorarIngredientesBebida }
      />
      <Route path="/explorar/comidas/area" component={ ExplorarComidasPorOrigem } />
      <Route path="/explorar/bebidas" component={ ExplorarBebidas } />
      <Route path="/explorar/comidas" component={ ExplorarComidas } />
      <Route path="/comidas/:id" render={ (props) => <Details { ...props } /> } />
      <Route path="/bebidas/:id" render={ (props) => <Details { ...props } /> } />
      <Route path="/receitas-feitas" component={ ReceitasFeitas } />
      <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
      <Route path="/comidas" component={ Comidas } />
      <Route path="/perfil" component={ Perfil } />
      <Route path="/bebidas" component={ Bebidas } />
      <Route path="/explorar" component={ Explorar } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default App;
