import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toggleCouldRedirectAction, getRecipesThunk } from '../Redux/actions';

function Filter({ filter, toggleCouldRedirect, testId, getRecipes, recipeType }) {
  const handleClick = () => {
    getRecipes(recipeType, filter);
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
});

Filter.propTypes = {
  filter: PropTypes.string,
  getRecipes: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Filter);
