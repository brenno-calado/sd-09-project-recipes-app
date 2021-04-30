import { shape } from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import RecipeDrinkDetailComponent
  from '../../Components/RecipeDrinkDetailComponent/RecipeDrinkDetailComponent';
import RecipeMealDetailComponent
  from '../../Components/RecipeMealDetailComponent/RecipeMealDetailComponent';
import { RecipeContext } from '../../Context';
import './RecipeDetailsScreen.css';

function RecipeDetailsScreen({ match: { params: { id } }, location: { pathname } }) {
  const { recipeSpec, setRecipeSpec } = useContext(RecipeContext);
  const [pageType, setPageType] = useState('');

  function checkPageType() {
    const page = pathname.split('/', 2)[1];
    setPageType(page);
  }

  function setRecipeOnState() {
    checkPageType();
    if (pageType === 'comidas') {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json())
        .then((result) => setRecipeSpec(result.meals[0]));
    }
    if (pageType === 'bebidas') {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json())
        .then((result) => setRecipeSpec(result.drinks[0]));
    }
  }

  useEffect(() => {
    setRecipeOnState();
  });

  return (
    <div className="recipe-details-main-container">
      {(pageType === 'comidas') && (
        <RecipeMealDetailComponent recipe={ recipeSpec } pageType={ pageType } />
      )}
      {(pageType === 'bebidas') && (
        <RecipeDrinkDetailComponent recipe={ recipeSpec } pageType={ pageType } />
      )}
    </div>
  );
}

RecipeDetailsScreen.propTypes = {
  match: shape().isRequired,
  location: shape().isRequired,
};

export default RecipeDetailsScreen;
