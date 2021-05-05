import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Food from './Pages/Food';
import Drinks from './Pages/Drinks';
import DrinkDetails from './Pages/DrinkDetails';
import Profile from './Pages/Profile';
import Explore from './Pages/Explore';
import ExploreFoods from './Pages/ExploreFoods';
import ExploreDrinks from './Pages/ExploreDrinks';
import FoodInProgress from './Pages/FoodInProgress';
import DrinkInProgress from './Pages/DrinkInProgress';
import FoodDetails from './Pages/FoodDetails';
import ExploreFoodIngredient from './Pages/ExploreFoodIngredients';
import ExploreDrinkIngredient from './Pages/ExploreDrinkIngredients';
import DoneRecipes from './Pages/DoneRecipes';
import ExploreOrigin from './Pages/ExploreOrigin';
import FavoriteRecipes from './Pages/FavoriteRecipes';
import NotFound from './Pages/NotFound';

function App() {
  return (
    <Switch>
      <Route path="/bebidas/:id/in-progress" component={ DrinkInProgress } />
      <Route path="/comidas/:id/in-progress" component={ FoodInProgress } />
      <Route exact path="/explorar/comidas/area" component={ ExploreOrigin } />
      <Route path="/explorar/bebidas/ingredientes" component={ ExploreDrinkIngredient } />
      <Route path="/explorar/comidas/ingredientes" component={ ExploreFoodIngredient } />
      <Route path="/bebidas/:id" component={ DrinkDetails } />
      <Route path="/comidas/:id" component={ FoodDetails } />
      <Route exact path="/explorar/comidas" component={ ExploreFoods } />
      <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
      <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
      <Route exact path="/explorar" component={ Explore } />
      <Route path="/receitas-feitas" component={ DoneRecipes } />
      <Route path="/comidas" component={ Food } />
      <Route path="/bebidas" component={ Drinks } />
      <Route path="/perfil" component={ Profile } />
      <Route exact path="/" component={ Login } />
      <Route component={ NotFound } />
    </Switch>
  );
}

export default App;
