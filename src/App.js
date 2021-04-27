import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RecipesProvider from './contexts/RecipesProvider';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Cocktails from './pages/Cocktails';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <RecipesProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route
          exact
          path="/comidas/:id"
          render={ (props) => <Meals { ...props } /> }
        />
        <Route
          exact
          path="/bebidas/:id"
          render={ (props) => <Cocktails { ...props } /> }
        />
        <Route exact path="/comidas" component={ Meals } />
        <Route exact path="/bebidas" component={ Cocktails } />
      </Switch>
    </RecipesProvider>
  );
}

export default App;
