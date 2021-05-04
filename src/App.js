import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import NoFound from './components/noFound';

//  Pages
import {
  Login,
  MainFoods,
  MainDrinks,
  RecipeDetailsFoods,
  RecipeDetailsDrinks,
  ProgressFoods,
  ProgressDrinks,
  Explore,
  ExploreFoods,
  ExploreDrinks,
  IngredientsFoods,
  ingredientsDrinks,
  ExploreByLocalOrigin,
  Profile,
  RecipesDone,
  RcipesFavorites,
} from './pages';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ MainFoods } />
      <Route exact path="/bebidas" component={ MainDrinks } />
      <Route exact path="/comidas/:id" component={ RecipeDetailsFoods } />
      <Route exact path="/bebidas/:id" component={ RecipeDetailsDrinks } />
      <Route exact path="/:recipeType/:id/in-progress" component={ ProgressFoods } />
      {/* <Route exact path="/bebidas/:id/in-progress" component={ ProgressDrinks } /> */}
      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/explorar/comidas" component={ ExploreFoods } />
      <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
      <Route exact path="/explorar/comidas/ingredientes" component={ IngredientsFoods } />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ ingredientsDrinks }
      />
      <Route exact path="/explorar/comidas/area" component={ ExploreByLocalOrigin } />
      <Route exact path="/perfil" component={ Profile } />
      <Route exact path="/receitas-feitas" component={ RecipesDone } />
      <Route exact path="/receitas-favoritas" component={ RcipesFavorites } />
      <Route exact path="*" component={ NoFound } />
    </Switch>
  );
}

export default App;
