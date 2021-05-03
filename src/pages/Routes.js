import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Food from './Food';
import Login from './Login';
import Drinks from './Drinks';
import Profile from './Profile';
import Explorer from './Explorer';
import NotFound from './NotFound';
import ExploreArea from './ExploreArea';
import ExploreFood from './ExploreFood';
import ExploreIngredients from './ExploreIngredients';
import ExploreDrinks from './ExploreDrinks';
import RecipeDetails from './RecipeDetails';
import FavoriteRecipes from './FavoriteRecipes';
import CompletedRecipes from './CompletedRecipes';
import RecipeInProgress from './RecipeInProgress';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={ Login } />
    <Route
      path="/comidas/:id/in-progress"
      render={ (props) => <RecipeInProgress { ...props } /> }
    />
    <Route
      path="/bebidas/:id/in-progress"
      render={ (props) => <RecipeInProgress { ...props } /> }
    />
    <Route
      path="/comidas/:id"
      render={ (props) => <RecipeDetails { ...props } /> }
    />
    <Route
      path="/bebidas/:id"
      render={ (props) => <RecipeDetails { ...props } /> }
    />
    <Route path="/comidas" component={ Food } />
    <Route path="/bebidas" component={ Drinks } />
    <Route
      path="/explorar/comidas/ingredientes"
      render={ (props) => <ExploreIngredients { ...props } /> }
    />
    <Route
      path="/explorar/bebidas/ingredientes"
      render={ (props) => <ExploreIngredients { ...props } /> }
    />
    <Route path="/explorar/comidas/area" component={ ExploreArea } />
    <Route path="/explorar/comidas" component={ ExploreFood } />
    <Route path="/explorar/bebidas" component={ ExploreDrinks } />
    <Route path="/explorar" component={ Explorer } />
    <Route path="/perfil" component={ Profile } />
    <Route path="/receitas-feitas" component={ CompletedRecipes } />
    <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
    <Route component={ NotFound } />
  </Switch>
);

export default Routes;
