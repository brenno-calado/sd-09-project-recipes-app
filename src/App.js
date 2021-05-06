import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/login';
import MainPage from './pages/mainPage';
import RecipeDetails from './pages/recipeDetails';
// import DrinkDetails from './pages/drinkDetails';
import RecipeInProcess from './pages/recipeInProcess';
// import DrinkInProcess from './pages/drinkInProcess';
import Explore from './pages/explore';
import ExploreFoodOrDrink from './pages/exploreFoodOrDrink';
import ExploreIngredients from './pages/exploreIngredients';
import ExploreFoodByLocal from './pages/exploreFoodByLocal';
import Profile from './pages/profile';
import DoneRecipes from './pages/doneRecipes';
import FavoriteRecipes from './pages/favoriteRecipes';
import Page404 from './pages/page404';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ MainPage } />
      <Route exact path="/bebidas" component={ MainPage } />
      <Route exact path="/comidas/:id" component={ RecipeDetails } />
      <Route exact path="/bebidas/:id" component={ RecipeDetails } />
      <Route exact path="/comidas/:id/in-progress" component={ RecipeInProcess } />
      <Route exact path="/bebidas/:id/in-progress" component={ RecipeInProcess } />
      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/explorar/comidas" component={ ExploreFoodOrDrink } />
      <Route exact path="/explorar/bebidas" component={ ExploreFoodOrDrink } />
      <Route path="/explorar/comidas/ingredientes" component={ ExploreIngredients } />
      <Route path="/explorar/bebidas/ingredientes" component={ ExploreIngredients } />
      <Route path="/explorar/comidas/area" component={ ExploreFoodByLocal } />
      <Route path="/perfil" component={ Profile } />
      <Route path="/receitas-feitas" component={ DoneRecipes } />
      <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
      <Route path="/*" component={ Page404 } />
    </Switch>
  );
}

export default App;
