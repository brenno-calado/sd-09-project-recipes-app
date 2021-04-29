import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RecipesProvider from './contexts/RecipesProvider';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Cocktails from './pages/Cocktails';
import Perfil from './pages/Perfil';
import Explorar from './pages/Explorar';
import ReceitasFavoritas from './pages/ReceitasFavoritas';
import ReceitasFeitas from './pages/ReceitasFeitas';
import ExplorarComidas from './pages/ExplorarComidas';
import ExplorarBebidas from './pages/ExplorarBebidas';
import ComidasPorIngredientes from './pages/ComidasPorIngredientes';
import BebidasPorIngredientes from './pages/BebidasPorIngredientes';
import ComidaOrigem from './pages/ComidaOrigem';
import RecipeDetails from './pages/RecipeDetails';
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
        <Route exact path="/comidas" component={ Meals } />
        <Route exact path="/bebidas" component={ Cocktails } />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ BebidasPorIngredientes }
        />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ ComidasPorIngredientes }
        />
        {/* <Route
          path="/bebidas/{id-da-receita}/in-progress"
          component={ ProcessoDeBebida }
        />
        <Route
          path="/comidas/{id-da-receita}/in-progress"
          component={ ProcessoDeReceita }
        /> */}
        <Route exact path="/explorar/comidas/area" component={ ComidaOrigem } />
        <Route exact path="/receitas-favoritas" component={ ReceitasFavoritas } />
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
