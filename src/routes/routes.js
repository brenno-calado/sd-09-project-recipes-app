import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import { FoodDetails, FoodProgress, Foods } from '../pages/Foods';
import { DrinkDetails, DrinkProgress, Drinks } from '../pages/Drinks';
import NotFound from '../pages/NotFound';
import { Explorer } from '../pages/Explorer';
import { RecipesFavorite, RecipesMade } from '../pages/Recipes';
import Profile from '../pages/Profile/Profile';

function routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/comidas" exact component={ Foods } />
        <Route path="/bebidas" exact component={ Drinks } />
        <Route path="/comidas/:id" exact component={ FoodDetails } />
        <Route path="/bebidas/:id" exact component={ DrinkDetails } />
        <Route path="/comidas/:id/in-progress" component={ FoodProgress } />
        <Route path="/bebidas/:id/in-progress" component={ DrinkProgress } />
        <Route path="/Explorer" component={ Explorer } />
        <Route path="/RecipesFavorite" component={ RecipesFavorite } />
        <Route path="/RecipesMade" component={ RecipesMade } />
        <Route path="/Profile" component={ Profile } />
        <Route exact path="/" component={ Login } />
        <Route component={ NotFound } />
      </Switch>
    </BrowserRouter>
  );
}

export default routes;
