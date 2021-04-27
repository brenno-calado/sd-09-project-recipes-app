import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';

import paths from './paths';
import Login from '../pages/Login';

const { LOGIN } = paths;

const Routes = () => (
  <Switch>
    <Route exact path={ LOGIN } component={ Login } />
  </Switch>
);

export default Routes;
