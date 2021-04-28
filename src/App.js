import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Common/Components/Header';
import Profile from './Pages/Profile';
import MealRecipeDetails from './Pages/RecipeDetails';
import testRecipeDetailsObj from './Common/testRecipeDetailsObj';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="meals">
          <Switch>
            <Route exact path="/" render={ () => <Header pageName="Receita" /> } />
            <Route path="/perfil" component={ Profile } />
            <Route
              path="/mealrecipedetails"
              render={ () => <MealRecipeDetails recipe={ testRecipeDetailsObj } /> }
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
