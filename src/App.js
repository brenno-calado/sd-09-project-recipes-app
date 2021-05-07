import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppProvider from './context/AppContext';
import {
  Bebidas,
  Comidas,
  Explorar,
  ExplorarBebidas,
  ExplorarBebidasIngredientes,
  ExplorarComidas,
  ExplorarComidasArea,
  ExplorarComidasIngredientes,
  Login,
  Perfil,
  ReceitasFavoritas,
  ReceitasFeitas,
  DetalhesBebida,
  ProgressoBebidas,
  ProgressoComidas,
  DetalhesComida,
  NotFound,
} from './pages';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
  <AppProvider>
    <Switch>
      <Route path="/comidas/:id/in-progress" component={ ProgressoComidas } />
      <Route path="/comidas/:id" component={ DetalhesComida } />
      <Route path="/comidas" component={ Comidas } />
      <Route path="/bebidas/:id/in-progress" component={ ProgressoBebidas } />
      <Route path="/bebidas/:id" component={ DetalhesBebida } />
      <Route path="/bebidas" component={ Bebidas } />
      <Route
        path="/explorar/comidas/ingredientes"
        component={ ExplorarComidasIngredientes }
      />
      <Route path="/explorar/comidas/area" component={ ExplorarComidasArea } />
      <Route path="/explorar/comidas" component={ ExplorarComidas } />
      <Route
        path="/explorar/bebidas/ingredientes"
        component={ ExplorarBebidasIngredientes }
      />
      <Route path="/explorar/bebidas/area" component={ NotFound } />
      <Route path="/explorar/bebidas" component={ ExplorarBebidas } />
      <Route path="/explorar" component={ Explorar } />
      <Route path="/perfil" component={ Perfil } />
      <Route path="/receitas-feitas" component={ ReceitasFeitas } />
      <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
      <Route exact path="/" component={ Login } />
      <Route component={ NotFound } />
    </Switch>
  </AppProvider>
);

export default App;
