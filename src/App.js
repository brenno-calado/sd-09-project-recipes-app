import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RecipesProvider from './contexts/RecipesProvider';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Cocktails from './pages/Cocktails';
import RecipeDetails from './pages/RecipeDetails';
import Perfil from './pages/Perfil';
import Explorar from './pages/Explorar';
import FavoriteRecipes from './pages/FavoriteRecipes';
import ReceitasFeitas from './pages/ReceitasFeitas';
import ExplorarComidas from './pages/ExplorarComidas';
import ExplorarBebidas from './pages/ExplorarBebidas';
import ExplorarIngredientes from './pages/ExplorarIngredientes';
import ComidaOrigem from './pages/ComidaOrigem';
import NotFound from './pages/NotFound';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <RecipesProvider>
      <Switch>
        <Route
          exact
          path="/comidas/:id"
          render={ (props) => <RecipeDetails { ...props } /> }
        />
        <Route
          exact
          path="/bebidas/:id"
          render={ (props) => <RecipeDetails { ...props } /> }
        />
        <Route
          exact
          path="/comidas/:id/in-progress"
          render={ (props) => <RecipeDetails { ...props } /> } // mudar para componente de receita em progresso
        />
        <Route
          exact
          path="/bebidas/:id/in-progress"
          render={ (props) => <RecipeDetails { ...props } /> } // mudar para componente de receita em progresso
        />
        <Route
          exact
          path="/comidas"
          render={ (props) => <Meals { ...props } /> }
        />
        <Route
          exact
          path="/bebidas"
          render={ (props) => <Cocktails { ...props } /> }
        />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ ExplorarIngredientes }
        />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ ExplorarIngredientes }
        />
        <Route exact path="/explorar/comidas/area" component={ ComidaOrigem } />
        <Route exact path="/explorar/bebidas/area" component={ NotFound } />
        <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
        <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
        <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
        <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
        <Route exact path="/explorar" component={ Explorar } />
        <Route path="/perfil" component={ Perfil } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </RecipesProvider>
  );
}

export default App;
