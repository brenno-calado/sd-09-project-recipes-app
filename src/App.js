import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Comidas from './pages/Comidas';
import ExplorarIngredientes from './pages/ExplorarIngredientes';
import DetalheComidas from './pages/DetalheComidas';
import DetalheBebidas from './pages/DetalheBebidas';
import ExplorarOrigem from './pages/ExplorarOrigem';
import ExplorarBebidas from './pages/ExplorarBebidas';
import ExplorarComidas from './pages/ExplorarComidas';
import Explorar from './pages/Explorar';
import Perfil from './pages/Perfil';
import ReceitasFeitas from './pages/ReceitasFeitas';
import ReceitasFavoritas from './pages/ReceitasFavoritas';
import RecipiesProvider from './context/RecipiesContext';
import Bebidas from './pages/Bebidas';
import NotFound from './pages/NotFound';

function App() {
  return (
    <RecipiesProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/explorar/comidas/area" component={ ExplorarOrigem } />
        <Route path="/explorar/bebidas/area" component={ NotFound } />
        <Route path="/explorar/bebidas/ingredientes" component={ ExplorarIngredientes } />
        <Route path="/explorar/comidas/ingredientes" component={ ExplorarIngredientes } />
        <Route path="/comidas/:id" component={ DetalheComidas } />
        <Route path="/comidas" component={ Comidas } />
        <Route path="/bebidas/:id" component={ DetalheBebidas } />
        <Route path="/bebidas" component={ Bebidas } />
        <Route path="/explorar/bebidas" component={ ExplorarBebidas } />
        <Route path="/explorar/comidas" component={ ExplorarComidas } />
        <Route path="/explorar" component={ Explorar } />
        <Route path="/perfil" component={ Perfil } />
        <Route path="/receitas-feitas" component={ ReceitasFeitas } />
        <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
      </Switch>
    </RecipiesProvider>
  );
}

export default App;
