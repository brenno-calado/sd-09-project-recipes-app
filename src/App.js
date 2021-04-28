import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login/Login';
import Recipes from './pages/Recipes/Recipes';
import Drinks from './pages/Drinks/Drinks';
import UserProfile from './pages/UserProfile/UserProfile';
import Explorer from './pages/Explorer/Explorer';


function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/comidas" component={ Recipes } />
      <Route path="/bebidas" component={ Drinks } />
      <Route path="/perfil" component={ UserProfile } />
      <Route path="/explorar" component={ Explorer } />
    </Switch>
  );
}

export default App;
