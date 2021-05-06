import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MealsAndDrinkProvider from './context/MealsAndDrinkProvider';
import Login from './pages/Login';
import InProgress from './pages/InProgress';
import RecipeDetails from './pages/RecipeDetails';
import RecipesDone from './pages/RecipesDone';
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
          <Route path="/comidas" component={ RecipeMain } />
          <Route path="/bebidas" component={ RecipeMain } />
          <Route path="/comidas/:id/" component={ RecipeDetails } />
          <Route path="/bebidas/:id/" component={ RecipeDetails } />
          <Route path="/comidas/:id/in-progress" component={ InProgress } />
          <Route path="/bebidas/:id/in-progress" component={ InProgress } />
          <Route path="/receitas-feitas" component={ RecipesDone } />
          <Route path="/receitas-favoritas" component={ RecipesFavorite } />
          <Route path="/explorar" component={ Explore } />
          <Route path="/explorar/comidas" component={ ExploreMeals } />
          <Route path="/explorar/bebidas" component={ ExploreDrinks } />
          <Route exact path="/" component={ Login } />
        </Switch>
      </BrowserRouter>
    </MealsAndDrinkProvider>
  );
}

export default App;
