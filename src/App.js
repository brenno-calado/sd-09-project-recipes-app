import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Provider from './context/Provider';
import DrinksDetails from './pages/DrinksDetails/DrinksDetails';
import RecipeDetails from './pages/RecipeDetails/RecipeDetails';
import Login from './pages/Login/Login';
import Recipes from './pages/Recipes/Recipes';
import Drinks from './pages/Drinks/Drinks';
import UserProfile from './pages/UserProfile/UserProfile';
import Explorer from './pages/Explorer/Explorer';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/comidas/:id" component={ RecipeDetails } />
        <Route path="/bebidas/:id" component={ DrinksDetails } />
        <Route path="/comidas" component={ Recipes } />
        <Route path="/bebidas" component={ Drinks } />
        <Route path="/perfil" component={ UserProfile } />
        <Route path="/explorar" component={ Explorer } />
      </Switch>
    </Provider>
  );
}

export default App;
