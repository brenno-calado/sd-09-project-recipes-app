import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import RecipeListCard from '../components/RecipeListCard';
import { removeRecipeFromFavorites } from '../services/storage';
import getPageTitle from '../services/pageTitles';
import paths from '../routes/paths';

const buttonsParams = [
  {
    name: 'All',
    props: {
      'data-testid': 'filter-by-all-btn',
      name: 'all',
    },
  },
  {
    name: 'Foods',
    props: {
      'data-testid': 'filter-by-food-btn',
      name: 'foods',
    },
  },
  {
    name: 'Drinks',
    props: {
      'data-testid': 'filter-by-drink-btn',
      name: 'drinks',
    },
  },
];

const recipesFilters = {
  all: () => true,
  foods: ({ type }) => type === 'comida',
  drinks: ({ type }) => type === 'bebida',
};

const renderButtons = (buttonParams, setFilterKey) => (
  buttonParams.map(({ name, props }) => (
    <button
      type="button"
      { ...props }
      key={ name }
      onClick={ ({ target: { name: btnName } }) => setFilterKey(btnName) }
    >
      { name }
    </button>
  ))
);

const RecipeList = ({ match: { path } }) => {
  const { pathname } = useLocation();
  const isDonePage = pathname === paths.DONE_RECIPES;
  const storageKey = isDonePage ? 'doneRecipes' : 'favoriteRecipes';
  const storageRecipes = JSON.parse(localStorage.getItem(storageKey)) || [];

  const [recipes, setRecipesList] = useState(storageRecipes);
  const [recipesFilterKey, setFilterKey] = useState('all');

  const removeFavRecipe = (recipe) => {
    setRecipesList((currentRecipes) => currentRecipes
      .filter(({ id, type }) => recipe.id !== id && recipe.type !== type));
    removeRecipeFromFavorites(recipe, recipe.id, recipe.type);
  };

  const shownRecipes = recipes.filter(recipesFilters[recipesFilterKey]);

  return (
    <>
      <Header title={ getPageTitle(path) } />
      { renderButtons(buttonsParams, setFilterKey) }
      { shownRecipes.map((recipe, index) => (
        <RecipeListCard
          recipe={ recipe }
          index={ index }
          key={ index }
          isDonePage={ isDonePage }
          favCallback={ removeFavRecipe }
        />
      )) }
    </>
  );
};

export default RecipeList;

RecipeList.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
};
