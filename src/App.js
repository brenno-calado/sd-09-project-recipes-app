import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Comidas from './pages/Comidas';
import Bebidas from './pages/Bebidas';
import RecipiesProvider from './context/RecipiesContext';

function App() {
  return (
    <RecipiesProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/comidas" component={ Comidas } />
        <Route path="/bebidas" component={ Bebidas } />
      </Switch>
    </RecipiesProvider>
  );
}

export default App;
