import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Comidas from './components/Comidas';
import Login from './Pages/Login';
import Perfil from './components/Perfil';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/comidas" component={ Comidas } />
        <Route path="/perfil" component={ Perfil } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
