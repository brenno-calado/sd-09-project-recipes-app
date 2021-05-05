import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mealsRecommendedThunk, cocktailsRecommendedThunk } from '../redux/actions';

import HorizontalScrollMenu from './HorizontalScrollMenu';

import '../css/RecommendedRecipes.css';

function RecommendedRecipes({
  mealsThunkDispatcher,
  cocktailsThunkDispatcher,
  recipeType,
  recommended,
}) {
  const verifyRecipeType = useCallback(() => {
    if (recipeType === 'comidas') {
      cocktailsThunkDispatcher();
    }
    if (recipeType === 'bebidas') {
      mealsThunkDispatcher();
    }
  }, [recipeType, cocktailsThunkDispatcher, mealsThunkDispatcher]);

  useEffect(() => {
    verifyRecipeType();
  }, [verifyRecipeType]);

  useEffect(() => {
    verifyFetch();
  }, [recommended, verifyFetch]);

  return (
    <section className="recommendation-container">
      <HorizontalScrollMenu recommended={ recommended } />
    </section>
  );
}

const mapStateToProps = (state) => ({
  recipeType: state.recipesReducer.recipeType,
  recommended: state.recipeDetailsReducer.recommended,
});

const mapDispatchToProps = (dispatch) => ({
  mealsThunkDispatcher: () => dispatch(mealsRecommendedThunk()),
  cocktailsThunkDispatcher: () => dispatch(cocktailsRecommendedThunk()),
});

RecommendedRecipes.propTypes = {
  mealsThunkDispatcher: PropTypes.func.isRequired,
  cocktailsThunkDispatcher: PropTypes.func.isRequired,
  recipeType: PropTypes.string.isRequired,
  recommended: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecommendedRecipes);
