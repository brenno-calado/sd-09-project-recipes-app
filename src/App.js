import React from 'react';
import { Route } from 'react-router';
import Switch from 'react-bootstrap/esm/Switch';
import { RecipeContextProvider } from './contexts/recipeContext';
import Login from './pages/Login';
import Foods from './pages/Foods';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <RecipeContextProvider>
      <Switch>
        <Route path="/" exact component={ Login } />
        <Route path="/comidas" component={ Foods } />
      </Switch>
    </RecipeContextProvider>
  );
}

export default App;
