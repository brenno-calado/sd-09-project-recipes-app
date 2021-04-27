import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Provider from './context/Provider';
import Login from './pages/Login';
import FoodRecipes from './pages/FoodRecipes';
import Profile from './pages/Profile';

const App = () => (
  <Provider>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/comidas" component={ FoodRecipes } />
        <Route path="/perfil" component={ Profile } />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default App;
