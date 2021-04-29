import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/login';
import MainPage from './pages/mainPage';
import FoodDetails from './pages/foodDetails';
import DrinkDetails from './pages/drinkDetails';
import FoodInProcess from './pages/foodInProcess';
import DrinkInProcess from './pages/drinkInProcess';
import Explore from './pages/explore';
import ExploreFood from './pages/exploreFood';
import ExploreDrink from './pages/exploreDrink';
import ExploreFoodIngred from './pages/exploreFoodIngredients';
import ExploreDrinkIngred from './pages/exploreDrinkIngredients';
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
      <Route path="/comidas" component={ MainPage } />
      <Route path="/bebidas" component={ MainPage } />

      <Route exact path="/comidas/{id-da-receita}" component={ FoodDetails } />
      <Route exact path="/bebidas/{id-da-receita}" component={ DrinkDetails } />
      <Route path="/comidas/{id-da-receita}/in-progress" component={ FoodInProcess } />
      <Route path="/bebidas/{id-da-receita}/in-progress" component={ DrinkInProcess } />
      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/explorar/comidas" component={ ExploreFood } />
      <Route exact path="/explorar/bebidas" component={ ExploreDrink } />
      <Route path="/explorar/comidas/ingredientes" component={ ExploreFoodIngred } />
      <Route path="/explorar/bebidas/ingredientes" component={ ExploreDrinkIngred } />
      <Route path="/explorar/comidas/area" component={ ExploreFoodByLocal } />
      <Route path="/perfil" component={ Profile } />
      <Route path="/receitas-feitas" component={ DoneRecipes } />
      <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
      <Route path="/*" component={ Page404 } />
    </Switch>
  );
}

export default App;
