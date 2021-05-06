import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import RecipeDetails from './pages/RecipeDetails';
import RecipesDone from './pages/RecipesDone';
import MealsAndDrinkProvider from './context/MealsAndDrinkProvider';
import RecipeMain from './pages/RecipeMain';
import RecipesFavorite from './pages/RecipesFavorite';
import Explore from './pages/Explore';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreMeals from './pages/ExploreMeals';

function App() {
  return (
    <MealsAndDrinkProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/comidas/:id/" component={ RecipeDetails } />
          <Route path="/bebidas/:id/" component={ RecipeDetails } />
          <Route path="/comidas" component={ RecipeMain } />
          <Route path="/bebidas" component={ RecipeMain } />
          <Route path="/receitas-feitas" component={ RecipesDone } />
          <Route path="/receitas-favoritas" component={ RecipesFavorite } />
          <Route path="/explorar" component={ Explore } />
          <Route path="/explorar/comidas" component={ ExploreMeals } />
          <Route path="/explorar/bebidas" component={ ExploreDrinks } />
        </Switch>
      </BrowserRouter>
    </MealsAndDrinkProvider>
  );
}

export default App;
