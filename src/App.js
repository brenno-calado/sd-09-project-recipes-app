import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Comidas from './pages/Comidas';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import Explorar from './pages/Explorar';
import Bebidas from './pages/Bebidas';
import ReceitasFavoritas from './pages/ReceitasFavoritas';
import ReceitasFeitas from './pages/ReceitasFeitas';
import ExplorarComidas from './pages/ExplorarComidas';
import ExplorarBebidas from './pages/ExplorarBebidas';
import ComidasPorIngredientes from './pages/ComidasPorIngredientes';
import BebidasPorIngredientes from './pages/BebidasPorIngredientes';
import ComidaOrigem from './pages/ComidaOrigem';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ BebidasPorIngredientes }
        />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ ComidasPorIngredientes }
        />
        {/* <Route
          path="/bebidas/{id-da-receita}/in-progress"
          component={ ProcessoDeBebida }
        />
        <Route
          path="/comidas/{id-da-receita}/in-progress"
          component={ ProcessoDeReceita }
        /> */}
        <Route exact path="/explorar/comidas/area" component={ ComidaOrigem } />
        {/* <Route path="/bebidas/{id-da-receita}" component={ DestalhesBebidas } /> */}
        {/* <Route path="/comidas/{id-da-receita}" component={ DestalhesReceita } /> */}
        <Route exact path="/receitas-favoritas" component={ ReceitasFavoritas } />
        <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
        <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
        <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
        <Route exact path="/explorar" component={ Explorar } />
        <Route path="/perfil" component={ Perfil } />
        <Route path="/bebidas" component={ Bebidas } />
        <Route path="/comidas" component={ Comidas } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
