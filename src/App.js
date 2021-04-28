import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Foods from './pages/Foods';
import InProgress from './pages/InProgress';
import Beverages from './pages/Beverages';
import Ingredients from './pages/Ingredients';
import Areas from './pages/Areas';
import Done from './pages/Done';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import ExploreBeverages from './pages/ExploreBeverages';
import ExploreFoods from './pages/ExploreFoods';
import Details from './pages/Details';

function App() {
  return (
    <Switch>
      <Route
        path="/comidas/:id/in-progress"
        render={ (props) => <InProgress { ...props } /> }
      />
      <Route path="/comidas/:id" render={ (props) => <Details { ...props } /> } />
      <Route path="/comidas" render={ (props) => <Foods { ...props } /> } />
      <Route path="/bebidas/:id/in-progress" Ingredients />
      <Route path="/bebidas/:id" render={ (props) => <InProgress { ...props } /> } />
      <Route path="/bebidas" component={ Beverages } />
      <Route path="/explorar/comidas/area" component={ Areas } />
      <Route
        path="/explorar/comidas/ingredientes"
        render={ (props) => <Ingredients { ...props } /> }
      />
      <Route
        path="/explorar/bebidas/ingredientes"
        render={ (props) => <Ingredients { ...props } /> }
      />
      <Route path="/explorar/comidas" component={ ExploreFoods } />
      <Route path="/explorar/bebidas" component={ ExploreBeverages } />
      <Route path="/explorar" component={ Explore } />
      <Route path="/receitas-favoritas" component={ Favorites } />
      <Route path="/receitas-feitas" component={ Done } />
      <Route path="/perfil" component={ Profile } />
      <Route exact path="/" />
    </Switch>
  );
}

export default App;
