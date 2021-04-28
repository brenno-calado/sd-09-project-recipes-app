import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Food from './pages/Food';
import Drinks from './pages/Drinks';
import FoodRecipe from './pages/FoodRecipe';
import DrinkRecipe from './pages/DrinkRecipe';
import FoodRecipeProgress from './pages/FoodRecipeProgress';
import DrinkRecipeProgress from './pages/DrinkRecipeProgress';
import Explore from './pages/Explore';
import ExploreFood from './pages/ExploreFood';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreFoodIngredients from './pages/ExploreFoodIngredients';
import ExploreDrinksIngredients from './pages/ExploreDrinksIngredients';
import ExploreFoodArea from './pages/ExploreFoodArea';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

export default function App() {
  return (
    <Switch>
      <Route
        path="/explorar/bebidas/ingredientes"
        component={ ExploreDrinksIngredients }
      />
      <Route path="/perfil" component={ Profile } />
      <Route path="/receitas-feitas" component={ DoneRecipes } />
      <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
      <Route path="/explorar/comidas/ingredientes" component={ ExploreFoodIngredients } />
      <Route path="/explorar/comidas/area" component={ ExploreFoodArea } />
      <Route path="/explorar/comidas" component={ ExploreFood } />
      <Route path="/explorar/bebidas" component={ ExploreDrinks } />
      <Route path="/explorar" component={ Explore } />
      <Route path="/bebidas/:id/in-progress" component={ DrinkRecipeProgress } />
      <Route path="/bebidas/:id" component={ DrinkRecipe } />
      <Route path="/bebidas" component={ Drinks } />
      <Route path="/comidas/:id/in-progress" component={ FoodRecipeProgress } />
      <Route path="/comidas/:id" component={ FoodRecipe } />
      <Route path="/comidas" component={ Food } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}
