import React from 'react';
import './styles/App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import MealRecipes from './pages/MealRecipes';
import CocktailRecipes from './pages/CocktailRecipes';
import RecipeInProgress from './pages/RecipeInProgress';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ MealRecipes } />
        <Route exact path="/bebidas" component={ CocktailRecipes } />
        <Route exact path="/comidas/:id/in-progress" component={ RecipeInProgress } />
        <Route exact path="/bebidas/:id/in-progress" component={ RecipeInProgress } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
