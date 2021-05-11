import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { render } from '@testing-library/react';

import reducer from '../reducers';

const state = {
  userReducer: {
    user: { email: '' },
    favorites: [],
    doingRecipes: [],
    doneRecipes: [],
  },
  recipesReducer: {
    meals: [],
    categoriesMeals: [],
    drinks: [],
    categoriesDrinks: [],
    randomRecipe: { idMeal: '', idDrinks: '' },
    ingredients: [],
    selectedIngredient: '',
    filterByArea: [],
  },
};

export default function renderWithRouter(ui, routeConfigs = {}, valueState) {
  const route = routeConfigs.route || '/';
  const history = routeConfigs.history
        || createMemoryHistory({ initialEntries: [route] });
  let initialState = {};

  if (!valueState) {
    initialState = state;
  } else {
    initialState = {
      ...state,
      recipesReducer: {
        ...state.recipesReducer,
        ...valueState,
      },
    };
  }

  const actions = [];

  const observerMiddleware = () => (next) => (action) => {
    actions.push(action);
    return next(action);
  };

  const store = createStore(reducer, initialState, applyMiddleware(observerMiddleware));

  const utils = {
    dispatch(action) {
      return store.dispatch(action);
    },
    getDispatchedActions() {
      return actions;
    },
    getState() {
      return store.getState();
    },
  };

  return {
    ...render(
      <Provider store={ store }>
        <Router history={ history }>{ui}</Router>
      </Provider>,
    ),
    history,
    ...utils,
  };
}
