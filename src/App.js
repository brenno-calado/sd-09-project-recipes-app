import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import MealDetails from './pages/MealDetails';
import DrinkDetails from './pages/DrinkDetails';
import FoodsMainPage from './pages/FoodsMainPage';
import DrinksMainPage from './pages/DrinksMainPage';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import ExploreRecipes from './pages/ExploreRecipes';
import ExploreIngredients from './pages/ExploreIngredients';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ FoodsMainPage } />
      <Route exact path="/bebidas" component={ DrinksMainPage } />
      <Route path="/perfil" component={ Profile } />
      <Route path="/comidas/:id" component={ MealDetails } />
      <Route path="/bebidas/:id" component={ DrinkDetails } />
      <Route path="/explorar/comidas/ingredientes" component={ ExploreIngredients } />
      <Route path="/explorar/bebidas/ingredientes" component={ ExploreIngredients } />
      <Route path="/explorar/comidas" component={ ExploreRecipes } />
      <Route path="/explorar/bebidas" component={ ExploreRecipes } />
      <Route path="/explorar" component={ Explore } />
      {/* <Route path="/comidas/:id/in-progress" component={} />
      <Route path="/bebidas/:id/in-progress" component={} />

      <Route path="/explorar/comidas/area" component={} />
      <Route path="/receitas-feitas" component={} />
      <Route path="/receitas-favoritas" component={} /> */}
    </Switch>
  );
}

export default App;
