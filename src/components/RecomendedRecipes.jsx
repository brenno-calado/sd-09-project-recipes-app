import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

function RecomendedRecipes({ detailsContext }) {
  const { recomendationRecipesList, fetchRecomendationMealsAndDrinks } = detailsContext;

  useEffect(() => {
    if (!recomendationRecipesList) {
      fetchRecomendationMealsAndDrinks();
    }
  }, [recomendationRecipesList, fetchRecomendationMealsAndDrinks]);

  console.log(recomendationRecipesList);
  return (
    <section>
      <h2>Recomended Recipes</h2>
      { !recomendationRecipesList ? <p>Loading...</p> : <p>Lista vazia</p> }
    </section>
  );
}

RecomendedRecipes.propTypes = { recipesList: PropTypes.array }.isRequired;

export default RecomendedRecipes;
