import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Provider from './context/Provider';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Home, Foods, Drinks, FoodsDetails, DrinksDetails,
  FoodsInProgress, DrinksInProgress, Explore, ExploreFoods,
  ExploreFoodsAndIngredients, ExploreDrinks, ExploreArea, Profile,
  DoneRecipes, FavoriteRecipes, NotFound, ExploreDrinksAndIngredients,
} from './pages/index';

function App() {
  return (
    <Provider>
      <div className="meals">
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
          <Route
            path="/explorar/comidas/ingredientes"
            component={ ExploreFoodsAndIngredients }
          />
          <Route
            path="/explorar/bebidas/ingredientes"
            component={ ExploreDrinksAndIngredients }
          />
          <Route path="/explorar/comidas/area" component={ ExploreArea } />
          <Route path="/explorar/bebidas/area" render={ () => <div>Not Found</div> } />
          <Route path="/explorar/comidas" component={ ExploreFoods } />
          <Route path="/explorar/bebidas" component={ ExploreDrinks } />
          <Route path="/explorar" component={ Explore } />
          <Route
            path="/comidas/:id/in-progress"
            component={ FoodsInProgress }
          />
          <Route path="/comidas/:id" component={ FoodsDetails } />
          <Route path="/comidas" component={ Foods } />
          <Route
            path="/bebidas/:id/in-progress"
            component={ DrinksInProgress }
          />
          <Route path="/bebidas/:id" component={ DrinksDetails } />
          <Route path="/bebidas" component={ Drinks } />
          <Route path="/perfil" component={ Profile } />
          <Route path="/receitas-feitas" component={ DoneRecipes } />
          <Route component={ NotFound } />
        </Switch>
      </div>
    </Provider>
  );
}

export default App;
