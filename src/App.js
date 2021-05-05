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
import DoneRecipes from './pages/Done/DoneRecipes';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/comidas/:id/in-progress" component={ RecipeInProgress } />
        <Route path="/bebidas/:id/in-progress" component={ DrinkInProgress } />
        <Route path="/comidas/:id" component={ RecipeDetails } />
        <Route path="/bebidas/:id" component={ DrinksDetails } />
        <Route path="/comidas" component={ Recipes } />
        <Route path="/bebidas" component={ Drinks } />
        <Route path="/receitas-feitas" component={ DoneRecipes } />
        <Route path="/perfil" component={ UserProfile } />
        <Route path="/explorar" component={ Explorer } />
      </Switch>
    </Provider>
  );
}

export default App;
