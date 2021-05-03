import React, { useEffect, useState } from 'react';
import './RecipeDetails.css';
import Details from '../components/Details';
import RecomendedRecipes from '../components/RecomendedRecipes';
import DetailsBtnFavoriteRecipe from '../components/DetailsBtnFavoriteRecipe';
import DetailsBtnShareRecipe from '../components/DetailsBtnShareRecipe';
import DetailsBtnStartRecipe from '../components/DetailsBtnStartRecipe';
import { getIdFromURL, getPageFromURL } from '../services/others';
import {
  fetchOneMeal,
  fetchOneDrink,
  fetchMealsAcompaniments,
  fetchDrinksAcompaniments } from '../services/api';
import RecipeVideo from '../components/RecipeVideo';

function btnStartGetName() {
  const allRecipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const actualId = getIdFromURL();
  let btnName = 'Iniciar Receita';
  let foundCocktailsInProgress;
  let foundMealsInProgress;
  if (allRecipesInProgress) {
    if (allRecipesInProgress.cocktails) {
      foundCocktailsInProgress = Object
        .keys(allRecipesInProgress.cocktails)
        .find((key) => key === actualId);
    }
    if (allRecipesInProgress.meals) {
      foundMealsInProgress = Object
        .keys(allRecipesInProgress.meals)
        .find((key) => key === actualId);
    }
  }
  if (foundCocktailsInProgress || foundMealsInProgress) {
    btnName = 'Continuar Receita';
  }
  return btnName;
}

function btnStartShouldHide() {
  const allRecipesDone = JSON.parse(localStorage.getItem('doneRecipes'));
  const actualId = getIdFromURL();
  let recipeIsDone = false;
  let foundInDone;
  if (allRecipesDone) {
    foundInDone = allRecipesDone.find((recipes) => recipes.id === actualId);
  }
  if (foundInDone) {
    recipeIsDone = true;
  }
  return recipeIsDone;
}

function RecipeDetails() {
  const [recipe, setRecipe] = useState();
  const [recomendationRecipesList, setRecomendationRecipesList] = useState();

  async function fetchRecomendationMealsAndDrinks() {
    let found = [];
    const maxLengthRecomendedRecipes = 6;
    if (getPageFromURL()) {
      found = await fetchMealsAcompaniments();
    } else {
      found = await fetchDrinksAcompaniments();
    }
    setRecomendationRecipesList(found.splice(0, maxLengthRecomendedRecipes));
  }

  useEffect(() => {
    async function fetchOne() {
      const urlId = getIdFromURL();
      let found = {};
      if (getPageFromURL()) {
        found = await fetchOneMeal(urlId);
      } else {
        found = await fetchOneDrink(urlId);
      }
      setRecipe(found[0]);
    }
    fetchOne();
  }, []);

  const detailsContextProps = {
    recipe, recomendationRecipesList, fetchRecomendationMealsAndDrinks };

  return (
    <section>
      <h1 className="display-4 text-center">RECIPE DETAILS</h1>
      <div>
        {!recipe ? (
          <div>
            <p>loading</p>
            {!btnStartShouldHide()
              && <DetailsBtnStartRecipe
                btnName={ btnStartGetName() }
                detailsContext={ detailsContextProps }
              />}
          </div>
        ) : (
          <div>
            <Details detailsContext={ detailsContextProps } />
            <div className="buttons-section">
              <DetailsBtnFavoriteRecipe />
              <DetailsBtnShareRecipe />
              {!btnStartShouldHide()
              && <DetailsBtnStartRecipe
                btnName={ btnStartGetName() }
                detailsContext={ detailsContextProps }
              />}
            </div>
            <RecipeVideo detailsContext={ detailsContextProps } />
            <RecomendedRecipes detailsContext={ detailsContextProps } />
          </div>
        )}
      </div>
    </section>
  );
}

export default RecipeDetails;
