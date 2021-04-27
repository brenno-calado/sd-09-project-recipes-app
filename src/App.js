import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Cocktails from './pages/Cocktails';
import Profile from './pages/Profile';

function App() {
  return (
    <div className="meals">
      <Switch>
      <Route path="/bebidas" component={ Cocktails } />
        <Route path="/comidas" component={ Meals } />
        <Route path="/perfil" component={ Profile } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}

export default App;
