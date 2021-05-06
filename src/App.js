import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import MealsCocktails from './pages/MealsCocktails';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import Details from './pages/Details';
import RecipeInProgress from './pages/RecipeInProgress';
import DoneRecipes from './pages/DoneRecipes';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreByIngredient from './pages/ExploreByIngredient';
import ExploreByArea from './pages/ExploreByArea';
import NotFound from './components/NotFound';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <div className="meals">
      <Switch>
        <Route path="/comidas/:id/in-progress" component={ RecipeInProgress } />
        <Route path="/bebidas/:id/in-progress" component={ RecipeInProgress } />
        <Route path="/explorar/comidas/area" component={ ExploreByArea } />
        <Route path="/explorar/bebidas/ingredientes" component={ ExploreByIngredient } />
        <Route path="/explorar/comidas/ingredientes" component={ ExploreByIngredient } />
        <Route path="/explorar/comidas" component={ ExploreFoods } />
        <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
        <Route path="/comidas/:id" component={ Details } />
        <Route path="/bebidas/:id" component={ Details } />
        <Route exact path="/explorar" component={ Explore } />
        <Route path="/receitas-feitas" component={ DoneRecipes } />
        <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
        <Route path="/bebidas" component={ MealsCocktails } />
        <Route path="/comidas" component={ MealsCocktails } />
        <Route path="/perfil" component={ Profile } />
        <Route exact path="/" component={ Login } />
        <Route component={ NotFound } />
      </Switch>
    </div>
  );
}

export default App;
