import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Provider from './provider/Provider';
import Login from './pages/Login';
import PrincipalDrinks from './pages/PrincipalDrinks';
import PrincipalFoods from './pages/PrincipalFoods';
import Explore from './pages/Explore';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreDrinksByIngredients from './pages/ExploreDrinksByIngredients';
import ExploreFoods from './pages/ExploreFoods';
import ExploreFoodsByIngredients from './pages/ExploreFoodsByIngredients';
import ExploreFoodsByLocal from './pages/ExploreFoodsByLocal';
import Perfil from './pages/Perfil';
import recipesDone from './pages/recipesDone';
import recipesFavorites from './pages/recipesFavorites';
import ProcessDrinks from './pages/ProcessDrinks';
import ProcessFoods from './pages/ProcessFoods';
import FoodsDetails from './pages/FoodsDetails';
import DrinksDetails from './pages/DrinksDetails';

function App() {
  return (
    <BrowserRouter>
      <Provider>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas/:id" component={ FoodsDetails } />
        <Route exact path="/bebidas/:id" component={ DrinksDetails } />
        <Route exact path="/comidas/:id/in-progress" component={ ProcessFoods } />
        <Route exact path="/bebidas/:id/in-progress" component={ ProcessDrinks } />
        <Route exact path="/comidas" component={ PrincipalFoods } />
        <Route exact path="/bebidas" component={ PrincipalDrinks } />
        <Route exact path="/explorar" component={ Explore } />
        <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ ExploreDrinksByIngredients }
        />
        <Route exact path="/explorar/comidas" component={ ExploreFoods } />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ ExploreFoodsByIngredients }
        />
        <Route exact path="/explorar/comidas/area" component={ ExploreFoodsByLocal } />
        <Route exact path="/perfil" component={ Perfil } />
        <Route exact path="/receitas-feitas" component={ recipesDone } />
        <Route exact path="/receitas-favoritas" component={ recipesFavorites } />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
