import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import { Provider } from './context';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Profile from './pages/Profile';
import Layout from './components/Layout';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import FoodProgress from './pages/FoodProgress';
import DrinkProgress from './pages/DrinkProgress';
import Explore from './pages/Explore';
import ExploreFood from './pages/ExploreFood';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreFoodIngredients from './pages/ExploreFoodIngredients';
import ExploreDrinksIngredients from './pages/ExploreDrinksIngredients';
import ExploreFoodArea from './pages/ExploreFoodArea';
import NotFound from './pages/NotFound';
import Details from './components/Details';

export default function App() {
  return (
    <Layout>
      <Provider>
        <BrowserRouter>
          <Switch>
            <Route path="/bebidas/:id/in-progress" component={ DrinkProgress } />
            <Route path="/comidas/:id/in-progress" component={ FoodProgress } />
            <Route
              path="/explorar/comidas/ingredientes"
              component={ ExploreFoodIngredients }
            />
            <Route
              path="/explorar/bebidas/ingredientes"
              component={ ExploreDrinksIngredients }
            />
            <Route path="/explorar/comidas/area" component={ ExploreFoodArea } />
            <Route path="/explorar/bebidas/area" component={ NotFound } />
            <Route path="/explorar/comidas" component={ ExploreFood } />
            <Route path="/explorar/bebidas" component={ ExploreDrinks } />
            <Route path="/explorar/bebidas" component={ ExploreDrinks } />
            <Route
              path="/comidas/:id"
              render={ (props) => <Details { ...props } /> }
            />
            <Route
              path="/bebidas/:id"
              render={ (props) => <Details { ...props } /> }
            />
            <Route path="/explorar/bebidas" component={ ExploreDrinks } />
            <Route path="/explorar/comidas" component={ ExploreFood } />
            <Route path="/explorar" component={ Explore } />
            <Route path="/comidas" component={ Foods } />
            <Route path="/bebidas" component={ Drinks } />
            <Route path="/perfil" component={ Profile } />
            <Route path="/receitas-feitas" component={ DoneRecipes } />
            <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
            <Route exact path="/" component={ Login } />
            <Route component={ NotFound } />
          </Switch>
        </BrowserRouter>
      </Provider>
    </Layout>
  );
}
