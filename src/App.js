import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Foods from './pages/Foods';
import InProgress from './pages/InProgress';
import Beverages from './pages/Beverages';
import Ingredients from './pages/Ingredients';
import Areas from './pages/Areas';
import Done from './pages/Done';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import ExploreBeverages from './pages/ExploreBeverages';
import ExploreFoods from './pages/ExploreFoods';
import Details from './pages/Details';
import Login from './pages/Login';

function App() {
  return (
    <Switch>
      <Route
        path="/comidas/:id/in-progress"
        component={ InProgress }
      />
      <Route path="/comidas/:id" component={ Details } />
      <Route path="/comidas" component={ Foods } />
      <Route path="/bebidas/:id/in-progress" component={ InProgress } />
      <Route path="/bebidas/:id" component={ Details } />
      <Route path="/bebidas" component={ Beverages } />
      <Route path="/explorar/comidas/area" component={ Areas } />
      <Route path="/explorar/bebidas/area" component={ Areas } />
      <Route
        path="/explorar/comidas/ingredientes"
        component={ Ingredients }
      />
      <Route
        path="/explorar/bebidas/ingredientes"
        component={ Ingredients }
      />
      <Route path="/explorar/comidas" component={ ExploreFoods } />
      <Route path="/explorar/bebidas" component={ ExploreBeverages } />
      <Route path="/explorar" component={ Explore } />
      <Route path="/receitas-favoritas" component={ Favorites } />
      <Route path="/receitas-feitas" component={ Done } />
      <Route path="/perfil" component={ Profile } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default App;
