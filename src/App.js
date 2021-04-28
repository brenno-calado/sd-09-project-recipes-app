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
import ExploreBeveragesIngredients from './pages/ExploreBeveragesIngredients';
import ExploreFoodsIngredients from './pages/ExploreFoodsIngredients';
import NotFound from './pages/NotFound';

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
          <Route exact path="/explorar/comidas/area" component={ ExploreOrigin } />
          <Route exact path="/explorar/comidas" component={ ExploreFoods } />
          <Route exact path="/explorar/bebidas" component={ ExploreBeverages } />
          <Route exact path="/perfil" component={ Profile } />
          <Route exact path="/explorar" component={ Explore } />
          <Route exact path="/receitas-feitas" component={ RecipesDone } />
          <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
          <Route exact path="/bebidas/:id" component={ BeveragesDetails } />
          <Route exact path="/bebidas" component={ Beverages } />
          <Route exact path="/comidas/:id" component={ FoodsDetails } />
          <Route exact path="/comidas" component={ Foods } />
          <Route exact path="/" component={ Login } />
          <Route component={ NotFound } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
