import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Cocktails from './pages/Cocktails';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import Details from './pages/Details';
import RecipeInProgress from './pages/RecipeInProgress';

function App() {
  return (
    <div className="meals">
      <Switch>
        <Route path="/comidas/:id/in-progress" component={ RecipeInProgress } />
        <Route path="/bebidas/:id/in-progress" component={ RecipeInProgress } />
        <Route path="/comidas/:id" component={ Details } />
        <Route path="/bebidas/:id" component={ Details } />
        <Route path="/explorar/comidas/area" component={ Explore } />
        <Route path="/explorar/bebidas/ingredientes" component={ Explore } />
        <Route path="/explorar/comidas/ingredientes" component={ Explore } />
        <Route path="/explorar/comidas" component={ Explore } />
        <Route path="/explorar/bebidas" component={ Explore } />
        <Route path="/explorar" component={ Explore } />
        <Route path="/bebidas" component={ Cocktails } />
        <Route path="/comidas" component={ Meals } />
        <Route path="/perfil" component={ Profile } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}

export default App;
