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
  // isRecommendedFetched,
}) {
  // const [data, setData] = useState([]);

  const verifyRecipeType = useCallback(() => {
    if (recipeType === 'comidas') {
      cocktailsThunkDispatcher();
    }
    if (recipeType === 'bebidas') {
      mealsThunkDispatcher();
    }
  }, [recipeType, cocktailsThunkDispatcher, mealsThunkDispatcher]);

  // const verifyFetch = useCallback(() => {
  //   if (isRecommendedFetched) {
  //     const magicNumber = 6;
  //     setData(recommended.slice(0, magicNumber));
  //   }
  // }, [isRecommendedFetched, setData, recommended]);

  useEffect(() => {
    verifyRecipeType();
  }, [verifyRecipeType]);

  // useEffect(() => {
  //   verifyFetch();
  // }, [recommended, verifyFetch]);

  // const recommendedMeals = data.map((recipe, index) => (
  //   <div
  //     key={ recipe.idMeal }
  //     data-testid={ `${index}-recomendation-card` }
  //     className="recommendation-card"
  //   >
  //     <img
  //       src={ recipe.strMealThumb }
  //       alt="foto da receita"
  //     />
  //     <p>{recipe.strMeal}</p>
  //   </div>
  // ));

  // const recommendedDrinks = data.map((recipe, index) => (
  //   <div
  //     key={ recipe.idDrink }
  //     data-testid={ `${index}-recomendation-card` }
  //     className="recommendation-card"
  //   >
  //     <img
  //       src={ recipe.strDrinkThumb }
  //       alt="foto da receita"
  //     />
  //     <p>{recipe.strDrink}</p>
  //   </div>
  // ));

  return (
    <section className="recommendation-container">
      {/* { recipeType === 'comidas' ? recommendedDrinks : recommendedMeals } */}
      <HorizontalScrollMenu recommended={ recommended } />
    </section>
  );
}

const mapStateToProps = (state) => ({
  recipeType: state.recipesReducer.recipeType,
  recommended: state.recipeDetailsReducer.recommended,
  // isRecommendedFetched: state.recipeDetailsReducer.isRecommendedFetched,
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
  // isRecommendedFetched: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecommendedRecipes);
