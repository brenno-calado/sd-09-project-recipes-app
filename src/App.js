import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MealsAndDrinkProvider from './context/MealsAndDrinkProvider';
import Login from './pages/Login';
import RecipeDetails from './pages/RecipeDetails';
import InProgress from './pages/InProgress';

function App() {
  return (
    <MealsAndDrinkProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/comidas/in-progress" component={ InProgress } />
          <Route path="/bebidas/:id/in-progress" component={ InProgress } />
          <Route path="/comidas/:id/" component={ RecipeDetails } />
          <Route path="/bebidas/:id/" component={ RecipeDetails } />
          <Route path="/comidas" />
          <Route exact path="/" component={ Login } />
        </Switch>
      </BrowserRouter>
    </MealsAndDrinkProvider>
  );
}

export default App;
