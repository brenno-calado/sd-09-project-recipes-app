import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Foods from './pages/Foods';

function App() {
  return (
    <Switch>
      <Route path="/comidas" component={ Foods } />
      {/* <Route path="/bebidas" component={} />
      <Route path="/comidas/:id/in-progress" component={} />
      <Route path="/bebidas/:id/in-progress" component={} />
      <Route path="/comidas/:id" component={} />
      <Route path="/bebidas/:id" component={} />
      <Route path="/explorar/comidas/ingredientes" component={} />
      <Route path="/explorar/bebidas/ingredientes" component={} />
      <Route path="/explorar/comidas" component={} />
      <Route path="/explorar/bebidas" component={} />
      <Route path="/explorar/comidas/area" component={} />
      <Route path="/explorar" component={} />
      <Route path="/perfil" component={} />
      <Route path="/receitas-feitas" component={} />
      <Route path="/receitas-favoritas" component={} /> */}
      <Route path="/" component={ Login } />
      
    </Switch>
  );
}

export default App;
