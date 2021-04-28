import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Perfil from './pages/Profile';
import Bebidas from './pages/Drinks';
import Explorar from './pages/Explore';
import ExplorarComidas from './pages/ExploreMeals';
import ExplorarBebidas from './pages/ExploreDrinks';
import ExplorarIngredientesComida from './pages/ExploreMealsByIngredients';
import ExplorarIngredientesBebida from './pages/ExploreDrinksByIngredients';
import ExplorarComidasPorOrigem from './pages/ExploreMealsByOrigin';
import ReceitasFeitas from './pages/RecipesMade';
import ReceitasFavoritas from './pages/FavoriteRecipes';
import Comidas from './pages/Meals';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ Comidas } />
      <Route path="/perfil" component={ Perfil } />
      <Route exact path="/bebidas" component={ Bebidas } />
      <Route exact path="/explorar" component={ Explorar } />
      <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
      <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
      <Route
        exact
        path="/explorar/comidas/ingredientes"
        component={ ExplorarIngredientesComida }
      />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ ExplorarIngredientesBebida }
      />
      <Route exact path="/explorar/comidas/area" component={ ExplorarComidasPorOrigem } />
      <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
      <Route exact path="/receitas-favoritas" component={ ReceitasFavoritas } />
    </Switch>
  );
}

export default App;
