import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Login,
  MainDrinks,
  MainFoods,
  Profile,
  Explore,
  DoneRecipes,
  FavoriteRecipes,
} from './pages';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/comidas" component={ MainFoods } />
        <Route path="/bebidas" component={ MainDrinks } />
        <Route path="/perfil" component={ Profile } />
        <Route path="/explorar" component={ Explore } />
        <Route path="/receitas-feitas" component={ DoneRecipes } />
        <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
