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

const doneRecipes = [
  {
    id: '52771',
    type: 'comida',
    area: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'bebida',
    area: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

const RecipeList = ({ match: { path } }) => {
  const { pathname } = useLocation();
  const isDonePage = pathname === paths.DONE_RECIPES;
  // const storageKey = isDonePage ? 'doneRecipes' : 'favoriteRecipes';
  // const storageRecipes = JSON.parse(localStorage.getItem(storageKey)) || [];

  const [recipes, setRecipesList] = useState(doneRecipes);
  const [showCopyMsg, setShowCopyMsg] = useState(false);
  const [recipesFilterKey, setFilterKey] = useState('all');

  const toggleShowCopyMsg = () => {
    setShowCopyMsg((state) => !state);
  };

  const removeFavRecipe = ({ id, type }) => {
    setRecipesList((currentRecipes) => currentRecipes
      .filter((recipe) => recipe.id !== id && recipe.type !== type));
    removeRecipeFromFavorites(id, type);
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
          copyCallback={ toggleShowCopyMsg }
          favCallback={ removeFavRecipe }
        />
      )) }
      { showCopyMsg && <div>Link copiado!</div> }
    </>
  );
};

export default RecipeList;

RecipeList.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
};
