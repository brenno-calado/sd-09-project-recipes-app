import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Switch>
      <Route path="/" component={ Login } />
      {/* <Route path="/comidas" component={} /> */}
      {/* <Route path="/bebidas" component={} /> */}
      {/* <Route path="/comidas/:id/in-progress" component={} /> */}
      {/* <Route path="/bebidas/:id/in-progress" component={} /> */}
      {/* <Route path="/comidas/:id" component={} /> */}
      {/* <Route path="/bebidas/:id" component={} /> */}
      {/* <Route path="/explorar/comidas/ingredientes" component={} /> */}
      {/* <Route path="/explorar/bebidas/ingredientes" component={} /> */}
      {/* <Route path="/explorar/comidas" component={} /> */}
      {/* <Route path="/explorar/bebidas" component={} /> */}
      {/* <Route path="/explorar/comidas/area" component={} /> */}
      {/* <Route path="/explorar" component={} /> */}
      {/* <Route path="/perfil" component={} /> */}
      {/* <Route path="/receitas-feitas" component={} /> */}
      {/* <Route path="/receitas-favoritas" component={} /> */}
    </Switch>
  );
}

export default App;
