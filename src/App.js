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
import DrinkProgress from './Pages/DrinkProgress';
import FoodProgress from './Pages/FoodProgress';
import NotFound from './Components/NotFound';
import NewProfile from './Pages/NewProfile';

function App() {
  return (
    <div className="app">
      <Switch>
        <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
        <Route path="/receitas-feitas" component={ RecipesDone } />
        <Route path="/perfil" component={ Profile } />
        <Route exact path="/explorar/comidas/area" component={ ExploreFoodByArea } />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ ExploreDrinkByIng }
        />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ ExploreFoodByIng }
        />
        <Route exact path="/explorar/bebidas" component={ ExploreDrink } />
        <Route exact path="/explorar/comidas" component={ ExploreFood } />
        <Route exact path="/explorar" component={ Explore } />
        <Route path="/bebidas/:id/in-progress" component={ DrinkProgress } />
        <Route path="/comidas/:id/in-progress" component={ FoodProgress } />
        <Route path="/cadastro" component={ NewProfile } />
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
        <Route path="*" component={ NotFound } />
      </Switch>
    </div>
  );
}

export default App;
