import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mealsRecommendedThunk, cocktailsRecommendedThunk } from '../redux/actions';

function RecommendedRecipes({
  mealsThunkDispatcher,
  cocktailsThunkDispatcher,
  recipeType,
  isRecommendedFetched,
  recommended,
}) {
  const [data, setData] = useState([]);

  const verifyRecipeType = useCallback(() => {
    if (recipeType === 'meals') {
      cocktailsThunkDispatcher();
    }
    if (recipeType === 'cocktails') {
      mealsThunkDispatcher();
    }
  }, [recipeType, cocktailsThunkDispatcher, mealsThunkDispatcher]);

  const verifyFetch = useCallback(() => {
    if (isRecommendedFetched) {
      const magicNumber = 6;
      setData(recommended.slice(0, magicNumber));
    }
  }, [isRecommendedFetched, setData, recommended]);

  useEffect(() => {
    verifyRecipeType();
  }, [verifyRecipeType]);

  useEffect(() => {
    verifyFetch();
  }, [recommended, verifyFetch]);

  const recommendedMeals = data.map((recipe, index) => (
    <p
      key={ recipe.idMeal }
      data-testid={ `${index}-recomendation-card` }
    >
      { recipe.strMeal }
    </p>
  ));

  const recommendedDrinks = data.map((recipe, index) => (
    <p
      key={ recipe.idDrink }
      data-testid={ `${index}-recomendation-card` }
    >
      { recipe.strDrink }
    </p>
  ));

  return (
    <section>
      { recipeType === 'meals' ? recommendedDrinks : recommendedMeals }
    </section>
  );
}

const mapStateToProps = (state) => ({
  recipeType: state.recipesReducer.recipeType,
  isRecommendedFetched: state.recipeDetailsReducer.isRecommendedFetched,
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
  isRecommendedFetched: PropTypes.bool.isRequired,
  recommended: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecommendedRecipes);
