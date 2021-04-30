import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainFood from './Pages/MainFood';
import MainDrink from './Pages/MainDrink';
import Profile from './Pages/Profile';
import Login from './Pages/Login';
import FavoriteRecipes from './Pages/favoriteRecipe';
import RecipesDone from './Pages/RecipesDone';
import ExploreFoodByArea from './Pages/ExploreFoodByArea';
import ExploreDrinkByIng from './Pages/ExploreDrinkByIng';
import ExploreFoodByIng from './Pages/ExploreFoodByIng';
import ExploreDrink from './Pages/ExploreDrink';
import ExploreFood from './Pages/ExploreFood';
import Explore from './Pages/ Explore';
import DetailsFood from './Pages/Details+css/DetailsFood';
import DetailsDrinks from './Pages/Details+css/DetailsDrinks';
import './App.css';
// import ExploreFoodByArea from './Pages/ExploreFoodByAre';
import ExploreDrinksByArea from './Pages/ExploreDrinksByArea';

function App() {
  return (
    <Switch>
      <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
      <Route path="/receitas-feitas" component={ RecipesDone } />
      <Route path="/perfil" component={ Profile } />
      <Route path="/explorar/bebidas/area" component={ ExploreDrinksByArea } />
      <Route path="/explorar/comidas/area" component={ ExploreFoodByArea } />
      <Route path="/explorar/bebidas/ingredientes" component={ ExploreDrinkByIng } />
      <Route path="/explorar/comidas/ingredientes" component={ ExploreFoodByIng } />
      <Route path="/explorar/bebidas" component={ ExploreDrink } />
      <Route path="/explorar/comidas" component={ ExploreFood } />
      <Route path="/explorar" component={ Explore } />
      {/* <Route
        path="/bebidas/{id-da-receita}/in-progress"
        render={ (drink-id) => <DrinkProgress {...drink-id} /> }
      />
      <Route
        path="/comidas/{id-da-receita}/in-progress"
        render={ (recipe-id) => <FoodProgress {...recipe-id} /> }
      /> */}
      <Route
        path="/bebidas:{id-bebida}"
        render={ (drinkid) => <DetailsDrinks { ...drinkid } /> }
      />
      <Route
        path="/comidas/:{id-receita}"
        render={ (recipeid) => <DetailsFood { ...recipeid } /> }
      />
      <Route path="/comidas/:id/" component={ DetailsFood } />
      <Route path="/bebidas/:id/" component={ DetailsDrinks } />
      <Route path="/bebidas" component={ MainDrink } />
      <Route path="/comidas" component={ MainFood } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default App;
