import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import {
  toggleCouldRedirectAction,
  getRecipesThunk,
  selectFilterAction,
  getRecipesAction,
} from '../Redux/actions';
import { fetchRecipes } from '../services/fetchRecipes';

function Filter({
  filter,
  testId,
  getRecipes,
  recipeType,
  selectFilter,
  currentFilter,
  setRecipes,
  toggleCouldRedirect,
}) {
  const { pathname } = useLocation();
  const handleClick = () => {
    const currentFilterValue = filter !== currentFilter ? filter : '';
    const endpoint = pathname === '/comidas'
      ? 'https://www.themealdb.com/api/json/v1/1/search.php?s='
      : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

    const typeOfList = pathname === '/comidas' ? 'meals' : 'drinks';

    if (currentFilterValue === '') {
      fetchRecipes(endpoint, typeOfList).then((data) => setRecipes(data));
    } else {
      getRecipes(recipeType, currentFilterValue);
    }

    selectFilter(currentFilterValue);
    toggleCouldRedirect(false);
  };

  return (
    <button type="button" onClick={ handleClick } data-testid={ testId }>
      {filter}
    </button>
  );
}

const mapDispatchToProps = (dispatch) => ({
  toggleCouldRedirect: (bool) => dispatch(toggleCouldRedirectAction(bool)),
  getRecipes: (recipes, category) => dispatch(getRecipesThunk(recipes, category)),
  selectFilter: (newFilter) => dispatch(selectFilterAction(newFilter)),
  setRecipes: (recipesList) => dispatch(getRecipesAction(recipesList)),
});

const mapStateToProps = (state) => ({
  currentFilter: state.filter.currentFilter,
});

Filter.propTypes = {
  filter: PropTypes.string,
  getRecipes: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
