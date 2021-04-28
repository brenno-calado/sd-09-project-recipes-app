import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';

import paths from './paths';
import Login from '../pages/Login';
import Foods from '../pages/Foods';
import Drinks from '../pages/Drinks';
import Explore from '../pages/Explore';
import ExploreFood from '../pages/ExploreFood';
import ExploreDrink from '../pages/ExploreDrink';
import FoodByIngredients from '../pages/FoodByIngredients';
import DrinkByIngredients from '../pages/DrinkByIngredients';
import FoodByArea from '../pages/FoodByArea';
import Profile from '../pages/Profile';

const { LOGIN,
  FOODS,
  DRINKS,
  EXPLORE,
  EXPLORE_FOOD,
  EXPLORE_DRINK,
  FOOD_BY_INGREDIENTS,
  DRINK_BY_INGREDIENTS,
  FOOD_BY_AREA,
  PROFILE_PAGE } = paths;

const Routes = () => (
  <Switch>
    <Route exact path={ LOGIN } component={ Login } />
    <Route exact path={ FOODS } component={ Foods } />
    <Route exact path={ DRINKS } component={ Drinks } />
    <Route exact path={ EXPLORE } component={ Explore } />
    <Route exact path={ EXPLORE_FOOD } component={ ExploreFood } />
    <Route exact path={ EXPLORE_DRINK } component={ ExploreDrink } />
    <Route exact path={ FOOD_BY_INGREDIENTS } component={ FoodByIngredients } />
    <Route exact path={ DRINK_BY_INGREDIENTS } component={ DrinkByIngredients } />
    <Route exact path={ FOOD_BY_AREA } component={ FoodByArea } />
    <Route exact path={ PROFILE_PAGE } component={ Profile } />
  </Switch>
);

export default Routes;
