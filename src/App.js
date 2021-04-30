import React from 'react';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import Explorar from './pages/Explorar';
import ExplorarComidas from './pages/ExplorarComidas';
import ExplorarComidasIng from './pages/ExplorarComidasIng';
import ExplorarComidasArea from './pages/ExplorarComidasArea';
import ExplorarBebidas from './pages/ExplorarBebidas';
import ExplorarBebidasIng from './pages/ExplorarBebidasIng';
import DetalhesComida from './pages/DetalhesComida';
import DetalhesBebida from './pages/DetalhesBebida';
import Perfil from './pages/Perfil';
import PrincipalComidas from './pages/PrincipalComidas';
import PrincipalBebidas from './pages/PrincipalBebidas';
import ProcessoComida from './pages/ProcessoComida';
import ProcessoBebida from './pages/ProcessoBebida';
import Login from './pages/Login';
import ReceitasFeitas from './pages/ReceitasFeitas';
import ReceitasFavoritas from './pages/ReceitasFavoritas';

function App() {
  return (
    <main className="main">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ PrincipalComidas } />
        <Route exact path="/bebidas" component={ PrincipalBebidas } />
        {/* Placeholder do id */}
        <Route exact path="/comidas/id-da-receita" component={ DetalhesComida } />
        {/* Placeholder do id */}
        <Route exact path="/bebidas/id-da-receita" component={ DetalhesBebida } />
        {/* Placeholder do id */}
        <Route
          path="/comidas/id-da-receita/in-progress"
          component={ ProcessoComida }
        />
        {/* Placeholder do id */}
        <Route
          path="/bebidas/id-da-receita/in-progress"
          component={ ProcessoBebida }
        />
        <Route exact path="/explorar" component={ Explorar } />
        <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
        <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
        <Route path="/bebidas/id-da-receita/in-progress" component={ ProcessoBebida } />
        <Route exact path="/explorar" component={ Explorar } />
        <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
        <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
        <Route path="/explorar/comidas/ingredientes" component={ ExplorarComidasIng } />
        <Route path="/explorar/bebidas/ingredientes" component={ ExplorarBebidasIng } />
        <Route path="/explorar/comidas/area" component={ ExplorarComidasArea } />
        <Route path="/perfil" component={ Perfil } />
        <Route path="/receitas-feitas" component={ ReceitasFeitas } />
        <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
      </Switch>
    </main>
  );
}

export default App;
