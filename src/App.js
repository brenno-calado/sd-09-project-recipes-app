import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Bebidas from './pages/Bebidas';
import BebidasDetails from './pages/BebidasDetails';
import Comidas from './pages/Comidas';
import ComidasDetails from './pages/ComidasDetails';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="meals">
      <BrowserRouter>
        <Switch>
          <Route path="/bebidas/:id" component={ BebidasDetails } />
          <Route path="/bebidas" component={ Bebidas } />
          <Route path="/comidas/:id" component={ ComidasDetails } />
          <Route path="/comidas" component={ Comidas } />
          <Route path="/" component={ Login } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
