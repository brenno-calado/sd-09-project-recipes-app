import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  Bebidas,
  Comidas,
  Explorar,
  Login,
  Perfil,
} from './pages';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
  <Switch>
    {/* <Route path="/comidas/:id/in-progress" component={ ProgressoComidas } /> */}
    {/* <Route path="/comidas/:id" component={ DetalhesComida } /> */}
    <Route path="/comidas" component={ Comidas } />
    {/* <Route path="/bebidas/:id/in-progress" component={ ProgressoBebidas } /> */}
    {/* <Route path="/bebidas/:id" component={ DetalhesBebida } /> */}
    <Route path="/bebidas" component={ Bebidas } />
    {/* <Route
      path="/explorar/comidas/ingredientes"
      component={ ExplorarComidasIngredientes }
    /> */}
    {/* <Route path="/explorar/comidas/area" component={ ExplorarComidasArea } /> */}
    {/* <Route path="/explorar/comidas" component={ ExplorarComidas } /> */}
    {/* <Route
      path="/explorar/bebibas/ingredientes"
      component={ ExplorarBebidasIngredientes }
    /> */}
    {/* <Route path="/explorar/bebidas" component={ ExplorarBebidas } /> */}
    <Route path="/explorar" component={ Explorar } />
    <Route path="/perfil" component={ Perfil } />
    {/* <Route path="/receitas-feitas" component={ ReceitasFeitas } /> */}
    {/* <Route path="/receitas-favoritas" component={ ReceitasFavoritas } /> */}
    <Route exact path="/" component={ Login } />
  </Switch>
  // <div className="meals">
  //   <span className="logo">TRYBE</span>
  //   <object
  //     className="rocksGlass"
  //     type="image/svg+xml"
  //     data={ rockGlass }
  //   >
  //     Glass
  //   </object>
  // </div>
);

export default App;
