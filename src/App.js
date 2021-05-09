import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import './App.css';
import Login from './pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Beverages from './pages/Beverages';
// import BeveragesDetails from './pages/BeveragesDetails';
import BeveragesDetailsV2 from './pages/BeveragesDetailsV2';
import Foods from './pages/Foods';
// import FoodsDetails from './pages/FoodsDetails';
import FoodsDetailsV2 from './pages/FoodsDetailsV2';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import ExploreBeverages from './pages/ExploreBeverages';
import ExploreFoods from './pages/ExploreFoods';
import FavoriteRecipes from './pages/FavoriteRecipes';
import DoneRecipes from './pages/DoneRecipes';
import ExploreOrigin from './pages/ExploreOrigin';
import ExploreBeveragesIngredients from './pages/ExploreBeveragesIngredients';
import ExploreFoodsIngredients from './pages/ExploreFoodsIngredients';
import BeveragesInProgress from './pages/BeveragesInProgress';
import FoodsInProgress from './pages/FoodsInProgress';
import NotFound from './pages/NotFound';

function App() {
  return (
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
        <Route exact path="/receitas-feitas" component={ DoneRecipes } />
        <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
        <Route exact path="/bebidas/:id" component={ BeveragesDetailsV2 } />
        <Route
          exact
          path="/bebidas/:id/in-progress"
          component={ BeveragesInProgress }
        />
        <Route exact path="/bebidas" component={ Beverages } />
        <Route exact path="/comidas/:id" component={ FoodsDetailsV2 } />
        <Route exact path="/comidas/:id/in-progress" component={ FoodsInProgress } />
        <Route exact path="/comidas" component={ Foods } />
        <Route exact path="/" component={ Login } />
        <Route component={ NotFound } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
