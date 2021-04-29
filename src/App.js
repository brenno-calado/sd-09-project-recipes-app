import React from 'react';
import './styles/App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import MealRecipes from './pages/MealRecipes';
import CocktailRecipes from './pages/CocktailRecipes';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ MealRecipes } />
        <Route exact path="/bebidas" component={ CocktailRecipes } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
