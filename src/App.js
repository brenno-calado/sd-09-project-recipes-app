import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Pages/Login';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ Login } />
      </Switch>
    </Router>
  );
}

export default App;
