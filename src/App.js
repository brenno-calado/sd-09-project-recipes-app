import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Beverages from './pages/Beverages';
import BeveragesDetails from './pages/BeveragesDetails';
import Foods from './pages/Foods';
import FoodsDetails from './pages/FoodsDetails';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import ExploreBeverages from './pages/ExploreBeverages';
import ExploreFoods from './pages/ExploreFoods';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipesDone from './pages/RecipesDone';
import ExploreOrigin from './pages/ExploreOrigin';
import ExploreBeveragesIngredients from './pages/ExploreBeverageIngredients';
import ExploreFoodsIngredients from './pages/ExploreFoodsIngredients';

function App() {
  return (
    <div className="meals">
      <BrowserRouter>
        <Switch>
          <Route
            path="/explorar/comidas/ingredientes"
            component={ ExploreFoodsIngredients }
          />
          <Route
            path="/explorar/bebidas/ingredientes"
            component={ ExploreBeveragesIngredients }
          />
          <Route path="/explorar/comidas/area" component={ ExploreOrigin } />
          <Route path="/explorar/comidas" component={ ExploreFoods } />
          <Route path="/explorar/bebidas" component={ ExploreBeverages } />
          <Route path="/perfil" component={ Profile } />
          <Route path="/explorar" component={ Explore } />
          <Route path="/receitas-feitas" component={ RecipesDone } />
          <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
          <Route path="/bebidas/:id" component={ BeveragesDetails } />
          <Route path="/bebidas" component={ Beverages } />
          <Route path="/comidas/:id" component={ FoodsDetails } />
          <Route path="/comidas" component={ Foods } />
          <Route path="/" component={ Login } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
