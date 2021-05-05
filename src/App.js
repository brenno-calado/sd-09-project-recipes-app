import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Provider from './context/Provider';
import DrinksDetails from './pages/Drinks/DrinksDetails';
import RecipeDetails from './pages/Recipes/RecipeDetails';
import RecipeInProgress from './pages/Recipes/RecipeInProgress';
import DrinkInProgress from './pages/Drinks/DrinkInProgress';
import Login from './pages/Login/Login';
import Recipes from './pages/Recipes/Recipes';
import Drinks from './pages/Drinks/Drinks';
import UserProfile from './pages/UserProfile/UserProfile';
import Explorer from './pages/Explorer/Explorer';
import ExploreFood from './pages/Explorer/ExploreFood';
import ExploreDrinks from './pages/Explorer/ExploreDrinks';
import ExploreDrinksByIngredients from './pages/Explorer/ExploreDrinksByIngredients';
import ExploreFoodByIngredients from './pages/Explorer/ExploreFoodByIngredients';
import ExploreFoodByArea from './pages/Explorer/ExploreFoodByArea';
import DoneRecipes from './pages/Done/DoneRecipes';
import FavoriteRecipes from './pages/Favorites/FavoriteRecipes';

import NotFound from './pages/NotFound/NotFound';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/comidas/:id/in-progress" component={ RecipeInProgress } />
        <Route path="/bebidas/:id/in-progress" component={ DrinkInProgress } />
        <Route path="/comidas/:id" component={ RecipeDetails } />
        <Route path="/bebidas/:id" component={ DrinksDetails } />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ ExploreFoodByIngredients }
        />
        <Route
          exact
          path="/explorar/comidas/area"
          component={ ExploreFoodByArea }
        />
        <Route
          path="/explorar/bebidas/ingredientes"
          component={ ExploreDrinksByIngredients }
        />
        <Route path="/explorar/bebidas" component={ ExploreDrinks } />
        <Route path="/explorar/comidas" component={ ExploreFood } />
        <Route path="/comidas" component={ Recipes } />
        <Route path="/bebidas" component={ Drinks } />
        <Route path="/explorar" component={ Explorer } />
        <Route path="/receitas-feitas" component={ DoneRecipes } />
        <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
        <Route path="/perfil" component={ UserProfile } />
        <Route component={ NotFound } />
      </Switch>
    </Provider>
  );
}

export default App;
