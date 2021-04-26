import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Provider from './context/Provider';
import Login from './pages/Login';
import FoodRecipes from './pages/FoodRecipes';

const App = () => (
  <Provider>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/comidas" component={ FoodRecipes } />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default App;
