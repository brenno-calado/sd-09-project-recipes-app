import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import { FoodDetails, FoodProgress, Foods } from '../pages/Foods';
import { DrinkDetails, DrinkProgress, Drinks } from '../pages/Drinks';
import NotFound from '../pages/NotFound';
import {
  Explorer,
  ExplorerDrinks,
  ExplorerFoods,
  ExplorerFoodsIngredients,
  ExplorerFoodsRegion } from '../pages/Explorer';
import { RecipesFavorite, RecipesMade } from '../pages/Recipes';
import Profile from '../pages/Profile';
import ExplorerDrinksIngredients from '../pages/Explorer/ExplorerDrinksIngredients';

function routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/comidas" exact component={ Foods } />
        <Route path="/bebidas" exact component={ Drinks } />
        <Route path="/comidas/:id" exact component={ FoodDetails } />
        <Route path="/bebidas/:id" exact component={ DrinkDetails } />
        <Route path="/comidas/:id/in-progress" exact component={ FoodProgress } />
        <Route path="/bebidas/:id/in-progress" exact component={ DrinkProgress } />
        <Route path="/receitas-feitas" exact component={ RecipesMade } />
        <Route path="/receitas-favoritas" exact component={ RecipesFavorite } />
        <Route path="/perfil" exact component={ Profile } />
        <Route path="/" exact component={ Login } />
        <Route path="/explorar" exact component={ Explorer } />
        <Route path="/explorar/comidas" exact component={ ExplorerFoods } />
        <Route path="/explorar/bebidas" exact component={ ExplorerDrinks } />
        <Route
          path="/explorar/comidas/ingredientes"
          component={ ExplorerFoodsIngredients }
        />
        <Route
          path="/explorar/bebidas/ingredientes"
          component={ ExplorerDrinksIngredients }
        />
        <Route path="/explorar/comidas/area" exact component={ ExplorerFoodsRegion } />
        <Route component={ NotFound } />
      </Switch>
    </BrowserRouter>
  );
}

export default routes;
