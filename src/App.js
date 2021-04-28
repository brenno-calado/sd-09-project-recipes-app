import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Provider from './context/Provider';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Home, Foods, Drinks, FoodsDetails, DrinksDetails,
  FoodsInProgress, DrinksInProgress, Explore, ExploreFoods,
  ExploreDrinks, ExploreFoodsAndIngredients, ExploreArea, Profile,
  DoneRecipes, FavoriteRecipes, NotFound } from './pages/index';

function App() {
  return (
    <Provider>
      <div className="meals">
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route path="/comidas" component={ Foods } />
          <Route path="/bebidas" component={ Drinks } />
          <Route path="/comidas/{id-da-receita}" component={ FoodsDetails } />
          <Route path="/bebidas/{id-da-receita}" component={ DrinksDetails } />
          <Route
            path="/comidas/{id-da-receita}/in-progress"
            component={ FoodsInProgress }
          />
          <Route
            path="/bebidas/{id-da-receita}/in-progress"
            component={ DrinksInProgress }
          />
          <Route path="/explorar/comidas" component={ ExploreFoods } />
          <Route path="/explorar/bebidas" component={ ExploreDrinks } />
          <Route path="/explorar" component={ Explore } />
          <Route
            path="/explorar/comidas/ingredientes"
            component={ ExploreFoodsAndIngredients }
          />
          <Route path="/explorar/comidas/area" component={ ExploreArea } />
          <Route path="/perfil" component={ Profile } />
          <Route path="/receitas-feitas" component={ DoneRecipes } />
          <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
          <Route component={ NotFound } />
        </Switch>
      </div>
    </Provider>
  );
}

export default App;
