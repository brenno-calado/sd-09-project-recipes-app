import React from 'react';
import './styles/App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import MealRecipes from './pages/MealRecipes';
import CocktailRecipes from './pages/CocktailRecipes';
import RecipeInProgress from './pages/RecipeInProgress';
import Provider from './contextApi/provider';
import Explorar from './pages/Explorar';
import Perfil from './pages/Perfil';
import RecipeDetails from './pages/RecipeDetails';
import DoneRecipes from './pages/DoneRecipes';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/comidas" component={ MealRecipes } />
          <Route exact path="/bebidas" component={ CocktailRecipes } />
          <Route exact path="/comidas/:id/in-progress" component={ RecipeInProgress } />
          <Route exact path="/bebidas/:id/in-progress" component={ RecipeInProgress } />
          <Route exact path="/bebidas/:id" component={ RecipeDetails } />
          <Route exact path="/comidas/:id" component={ RecipeDetails } />
          <Route exact path="/receitas-feitas" component={ DoneRecipes } />
          <Route path="/explorar" component={ Explorar } />
          <Route exact path="/perfil" component={ Perfil } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
