import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Comidas from './pages/Comidas';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/comidas" component={ Comidas } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
