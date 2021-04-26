import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Comidas from './pages/Comidas';
import Login from './pages/Login';
import Perfil from './components/Perfil';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/perfil" component={ Perfil } />
        <Route path="/comidas" component={ Comidas } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
