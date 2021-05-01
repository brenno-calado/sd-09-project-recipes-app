import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Provider from './context/Provider';
import Login from './pages/Login';
// import FoodRecipes from './pages/FoodRecipes';
// import DrinkRecipes from './pages/DrinkRecipes';
//  Troquei esses dois componentes por um generico DrinksFoodsRecipes
import DrinksFoodsRecipes from './pages/DrinksFoodsRecipes';
import Profile from './pages/Profile';
import FoodInProgress from './pages/FoodInProgress';
import DrinkInProgress from './pages/DrinkInProcess';
import Explorer from './pages/Explorer';
import ExplorerFood from './pages/ExplorerFood';
import ExplorerDrink from './pages/ExplorerDrink';
import FoodIngredients from './pages/FoodIngredients';
import DrinkIngredients from './pages/DrinkIngredients';
import FoodArea from './pages/FoodArea';
import DoneRecipes from './pages/DoneRecipes';
import FavoritesRecipes from './pages/FavoritesRecipes';
import MealDetails from './pages/MealDetails';
import DrinkDetails from './pages/DrinkDetails';

const App = () => (
  <Provider>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/comidas/:id/in-progress" component={ FoodInProgress } />
        <Route path="/comidas/:id" component={ MealDetails } />
        <Route path="/comidas" component={ DrinksFoodsRecipes } />
        <Route path="/perfil" component={ Profile } />
        <Route path="/bebidas/:id/in-progress" component={ DrinkInProgress } />
        <Route path="/bebidas/:id" component={ DrinkDetails } />
        <Route path="/bebidas" component={ DrinksFoodsRecipes } />
        <Route path="/explorar/comidas/ingredientes" component={ FoodIngredients } />
        <Route path="/explorar/comidas/area" component={ FoodArea } />
        <Route path="/explorar/comidas" component={ ExplorerFood } />
        <Route path="/explorar/bebidas/ingredientes" component={ DrinkIngredients } />
        <Route path="/explorar/bebidas" component={ ExplorerDrink } />
        <Route path="/explorar" component={ Explorer } />
        <Route path="/receitas-feitas" component={ DoneRecipes } />
        <Route path="/receitas-favoritas" component={ FavoritesRecipes } />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default App;
