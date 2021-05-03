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
import ExploreDrinkIngredients from './Pages/ExploreDrinkIngredients';
import DoneRecipes from './Pages/DoneRecipes';
import ExploreOrigin from './Pages/ExploreOrigin';
import CreatedRecipes from './Pages/CreatedRecipes';
import FavoriteRecipes from './Pages/FavoriteRecipes';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/comidas/:id/in-progress" component={ FoodInProgress } />
      <Route path="/bebidas/:id/in-progress" component={ DrinkInProgress } />
      <Route path="/comidas/:id" component={ FoodDetails } />
      <Route path="/bebidas/:id" component={ DrinkDetails } />
      <Route exact path="/explorar" component={ Explore } />
      <Route path="/comidas" component={ Food } />
      <Route path="/bebidas" component={ Drinks } />
      <Route path="/perfil" component={ Profile } />
      <Route exact path="/explorar/comidas" component={ ExploreFoods } />
      <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
      <Route path="/receitas-feitas" component={ DoneRecipes } />
      <Route exact path="/explorar/comidas/area" component={ ExploreOrigin } />
      <Route exact path="/receitas-feitas" component={ CreatedRecipes } />
      <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
      <Route
        exact
        path="/explorar/comidas/ingredientes"
        component={ ExploreFoodIngredient }
      />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ ExploreDrinkIngredients }
      />
    </Switch>
  );
}

export default App;
