import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          { loggedIn ? <Redirect to="/recipes" /> : <Login /> }
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
