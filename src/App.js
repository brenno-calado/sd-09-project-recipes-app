import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login, Explore, Profile, FavoriteRecipes, DoneRecipes } from './pages';
import { Meals, ExploreMeals, MealsByIngredients, MealsByArea, MealsInProgress,
  MealsDetails } from './pages/meals';
import { Drinks, ExploreDrinks, DrinksByIngredients, DrinksInProgress,
  DrinksDetails } from './pages/drinks';
import './App.css';
import './scss/custom.scss';
// import rockGlass from './images/rockGlass.svg';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas/:id/in-progress" component={ MealsInProgress } />
      <Route exact path="/bebidas/:id/in-progress" component={ DrinksInProgress } />
      <Route exact path="/comidas/:id" component={ MealsDetails } />
      <Route exact path="/bebidas/:id" component={ DrinksDetails } />
      <Route path="/comidas" component={ Meals } />
      <Route path="/bebidas" component={ Drinks } />
      <Route path="/explorar/comidas/ingredientes" component={ MealsByIngredients } />
      <Route path="/explorar/bebidas/ingredientes" component={ DrinksByIngredients } />
      <Route path="/explorar/comidas/area" component={ MealsByArea } />
      <Route path="/explorar/bebidas/area" render={ () => <div>Not Found</div> } />
      <Route path="/explorar/comidas" component={ ExploreMeals } />
      <Route path="/explorar/bebidas" component={ ExploreDrinks } />
      <Route path="/explorar" component={ Explore } />
      <Route path="/perfil" component={ Profile } />
      <Route path="/receitas-feitas" component={ DoneRecipes } />
      <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
    </Switch>
    // <div className="meals">
    //   <span className="logo">TRYBE</span>
    //   <object
    //     className="rocksGlass"
    //     type="image/svg+xml"
    //     data={ rockGlass }
    //   >
    //     Glass
    //   </object>
    // </div>
  );
}

export default App;
