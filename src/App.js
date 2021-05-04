import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import RecipeDetails from './pages/RecipeDetails';
import MealsAndDrinkProvider from './context/MealsAndDrinkProvider';
import RecipeMain from './pages/RecipeMain';

function App() {
  return (
    <MealsAndDrinkProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/comidas/:id/" component={ RecipeDetails } />
          <Route path="/bebidas/:id/" component={ RecipeDetails } />
          <Route path="/comidas" component={ RecipeMain } />
          <Route path="/bebidas" component={ RecipeMain } />

        </Switch>
      </BrowserRouter>
    </MealsAndDrinkProvider>
  );
}

export default App;
