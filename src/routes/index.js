import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';

import paths from './paths';
import Login from '../pages/Login';
import Foods from '../pages/Foods';

const { LOGIN, FOODS } = paths;

const Routes = () => (
  <Switch>
    <Route exact path={ LOGIN } component={ Login } />
    <Route exact path={ FOODS } component={ Foods } />
  </Switch>
);

export default Routes;
