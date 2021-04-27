import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Comidas from './pages/Comidas';
import FooterMenu from './components/FooterMenu';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/comidas" component={ Comidas } />
      <Route path="/teste" component={ FooterMenu } />
    </Switch>
  );
}

export default App;
