import React from 'react';
// import './App.css';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import FoodMainPage from './pages/FoodMainPage';
import DrinkMainPage from './pages/DrinkMainPage';
import FoodDetails from './pages/FoodDetails';
import DrinkDetails from './pages/DrinkDetails';
import RecipeInProgress from './pages/RecipeInProgress';
import ExploreFood from './pages/ExploreFood';
import Explore from './pages/Explore';
import ExploreDrink from './pages/ExploreDrink';
import ExploreIngredients from './pages/ExploreIngredients';
import ExploreFoodArea from './pages/ExploreFoodArea';
import Perfil from './pages/Perfil';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <div className="meals">
      <Switch>
        <Route path="/comidas/:id/in-progress" component={ RecipeInProgress } />
        <Route path="/bebidas/:id/in-progress" component={ RecipeInProgress } />
        <Route path="/comidas/:id" component={ FoodDetails } />
        <Route path="/bebidas/:id" component={ DrinkDetails } />
        <Route path="/comidas" component={ FoodMainPage } />
        <Route path="/bebidas" component={ DrinkMainPage } />
        <Route path="/explorar/comidas/area" component={ ExploreFoodArea } />
        <Route
          path="/explorar/:page/ingredientes"
          component={ ExploreIngredients }
        />
        <Route path="/explorar/comidas" component={ ExploreFood } />
        <Route path="/explorar/bebidas" component={ ExploreDrink } />
        <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
        <Route path="/explorar" component={ Explore } />
        <Route path="/receitas-feitas" component={ DoneRecipes } />
        <Route path="/perfil" component={ Perfil } />
        <Route path="/" component={ Login } />
      </Switch>
    </div>
  );
}

export default App;
