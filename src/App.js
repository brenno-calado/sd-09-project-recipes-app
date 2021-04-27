import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import pages from './pages';
import Provider from './context/provider';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ pages.Login } />
          <Route exact path="/comidas" component={ pages.Foods } />
          <Route exact path="/comidas/:id" component={ pages.FoodDetails } />
          <Route
            exact
            path="/comidas/:id/in-progress"
            component={ pages.FoodInProgress }
          />
          <Route exact path="/bebidas" component={ pages.Drinks } />
          <Route exact path="/bebidas/:id" component={ pages.DrinkDetails } />
          <Route
            exact
            path="/bebidas/:id/in-progress"
            component={ pages.DrinkInProgress }
          />
          <Route exact path="/perfil" component={ pages.Profile } />
          <Route exact path="/receitas-feitas" component={ pages.DoneRecipes } />
          <Route exact path="/receitas-favoritas" component={ pages.FavoriteRecipes } />
          <Route exact path="/explorar" component={ pages.Explore } />
          <Route exact path="/explorar/comidas" component={ pages.ExploreFoods } />
          <Route
            exact
            path="/explorar/comidas/ingredientes"
            component={ pages.ExploreFoodsIngredients }
          />
          <Route
            exact
            path="/explorar/comidas/area"
            component={ pages.ExploreFoodsArea }
          />
          <Route exact path="/explorar/bebidas" component={ pages.ExploreDrinks } />
          <Route
            exact
            path="/explorar/bebidas/ingredientes"
            component={ pages.ExploreDrinksIngredients }
          />
          <Route exact path="/explorar/bebidas/area" component={ pages.NotFound } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
