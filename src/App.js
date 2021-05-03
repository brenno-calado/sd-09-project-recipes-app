import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import RecipeDetails from './pages/RecipeDetails';
import DrinkDetails from './pages/DrinkDetails';
import RecipeInProgress from './components/RecipeInProgress';

function App() {
  return (
    <div className="meals">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/comidas/:id/in-progress" component={ RecipeInProgress } />
        <Route path="/comidas/:id" component={ RecipeDetails } />
        <Route path="/comidas" component={ Foods } />
        <Route path="/bebidas/:id/in-progress" component={ RecipeInProgress } />
        <Route path="/bebidas/:id" component={ DrinkDetails } />
        <Route path="/bebidas" component={ Drinks } />
        <Route path="/explorar" component={ Explore } />
        <Route path="/perfil" component={ Profile } />
      </Switch>
    </div>
  );
}

export default App;
