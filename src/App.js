import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Pages/Login';
import Comidas from './Pages/Comidas';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Comidas } />
      </Switch>
    </Router>
  );
}

export default App;
