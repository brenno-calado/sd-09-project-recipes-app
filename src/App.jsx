import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Login, MainDrinks, MainFoods, Profile, Explore, ExploreFoods,
  ExploreDrinks, DoneRecipes, FavoriteRecipes } from './pages';
import RecipesAppProvider from './context/RecipesAppProvider';
import FoodsByIngredients from './pages/ExploreFoodsByIngredients';
import DrinksByIngredient from './pages/ExploreDrinksByIngredients';
import ExploreFoodsByOrigin from './pages/ExploreFoodsByOrigin';

function App() {
  return (
    <RecipesAppProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/comidas" component={ MainFoods } />
          <Route exact path="/bebidas" component={ MainDrinks } />
          <Route path="/perfil" component={ Profile } />
          <Route exact path="/explorar" component={ Explore } />
          <Route exact path="/explorar/comidas" component={ ExploreFoods } />
          <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
          <Route path="/explorar/comidas/ingredientes" component={ FoodsByIngredients } />
          <Route path="/explorar/bebidas/ingredientes" component={ DrinksByIngredient } />
          <Route path="/explorar/comidas/area" component={ ExploreFoodsByOrigin } />
          <Route path="/receitas-feitas" component={ DoneRecipes } />
          <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
        </Switch>
      </BrowserRouter>
    </RecipesAppProvider>
  );
}

export default App;
