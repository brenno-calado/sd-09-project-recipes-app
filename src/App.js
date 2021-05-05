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
import Meals from './pages/Meals';
import RecipesInProgress from './pages/RecipesInProgress';
import Details from './pages/Details';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Switch>
      <Route
        path="/comidas/:id"
        component={ (props) => <Details { ...props } type="meals" /> }
      />
      <Route
        path="/bebidas/:id"
        component={ (props) => <Details { ...props } type="drinks" /> }
      />
      <Route
        path="/explorar/comidas/ingredientes"
        component={ ExplorarIngredientesComida }
      />
      <Route
        path="/explorar/bebidas/ingredientes"
        component={ ExplorarIngredientesBebida }
      />
      <Route path="/comidas/:id/in-progress" component={ RecipesInProgress } />
      <Route path="/bebidas/:id/in-progress" component={ RecipesInProgress } />
      <Route path="/explorar/comidas" component={ ExplorarComidas } />
      <Route path="/explorar/comidas/area" component={ ExplorarComidasPorOrigem } />
      <Route path="/explorar/bebidas" component={ ExplorarBebidas } />
      <Route path="/receitas-feitas" component={ ReceitasFeitas } />
      <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
      <Route path="/comidas" component={ Meals } />
      <Route path="/perfil" component={ Perfil } />
      <Route path="/bebidas" component={ Bebidas } />
      <Route path="/explorar" component={ Explorar } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default App;
