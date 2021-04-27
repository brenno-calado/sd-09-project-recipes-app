import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Login, MainDrinks, MainFoods, Profile, Explore, ExploreFoods, ExploreDrinks, RecipesMades, FavoriteRecipes } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ MainFoods } />
        <Route exact path="/bebidas" component={ MainDrinks } />
        <Route path="/perfil" component={ Profile } />
        <Route path="/explorar" component={ Explore } />
        <Route path="/explorar/comidas" component={ ExploreFoods } />
        <Route path="/explorar/bebidas" component={ ExploreDrinks } />
        <Route path="/receitas-feitas" component={ RecipesMades } />
        <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
