import React from 'react';
import './App.css';
import { Route } from 'react-router';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Switch from 'react-bootstrap/esm/Switch';
import Login from './Pages/Login/Login';
import MealsScreen from './Pages/mealsScreen/MealsScreen';
import DrinksScreen from './Pages/DrinkScreen/DrinksScreen';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ MealsScreen } />
      <Route exact path="/bebidas" component={ DrinksScreen } />
    </Switch>
  );
}

export default App;
