import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';

import paths from './paths';
import Login from '../pages/Login';
import Main from '../pages/Main';
import Explore from '../pages/Explore';
import Profile from '../pages/Profile';
import RecipeList from '../pages/RecipeList';
import RecipeProgress from '../pages/RecipeProgress';
import RecipeDetails from '../pages/RecipeDetails';

const {
  LOGIN,
  FOODS,
  DRINKS,
  FOOD_IN_PROGRESS,
  DRINK_IN_PROGRESS,
  EXPLORE,
  EXPLORE_FOOD,
  EXPLORE_DRINK,
  FOOD_BY_INGREDIENTS,
  DRINK_BY_INGREDIENTS,
  FOOD_BY_AREA,
  PROFILE_PAGE,
  DONE_RECIPES,
  FAVORITE_RECIPES,
  FOOD_DETAILS,
  DRINK_DETAILS,
} = paths;

const Routes = () => (
  <Switch>
    <Route exact path={ LOGIN } component={ Login } />
    <Route exact path={ FOODS } component={ Main } />
    <Route exact path={ DRINKS } component={ Main } />
    <Route exact path={ FOOD_IN_PROGRESS } component={ RecipeProgress } />
    <Route exact path={ DRINK_IN_PROGRESS } component={ RecipeProgress } />
    <Route exact path={ EXPLORE } component={ Explore } />
    <Route exact path={ EXPLORE_FOOD } component={ Explore } />
    <Route exact path={ EXPLORE_DRINK } component={ Explore } />
    <Route exact path={ FOOD_BY_INGREDIENTS } component={ Explore } />
    <Route exact path={ DRINK_BY_INGREDIENTS } component={ Explore } />
    <Route exact path={ FOOD_BY_AREA } component={ Main } />
    <Route exact path={ PROFILE_PAGE } component={ Profile } />
    <Route exact path={ DONE_RECIPES } component={ RecipeList } />
    <Route exact path={ FAVORITE_RECIPES } component={ RecipeList } />
    <Route exact path={ FOOD_DETAILS } component={ RecipeDetails } />
    <Route exact path={ DRINK_DETAILS } component={ RecipeDetails } />
  </Switch>
);

export default Routes;
