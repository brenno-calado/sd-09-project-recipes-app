import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import MealsAndDrinkProvider from './context/MealsAndDrinkProvider';

function App() {
  return (
    <MealsAndDrinkProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/comidas" />
          <Route exact path="/" component={ Login } />
        </Switch>
      </BrowserRouter>
    </MealsAndDrinkProvider>
  );
}

export default App;
