import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Comidas from './pages/Comidas';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/comidas" component={ Comidas } />
    </Switch>
  );
}

export default App;
