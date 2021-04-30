import React, { useEffect, useState } from 'react';
import Details from '../components/Details';
import RecomendedRecipes from '../components/RecomendedRecipes';
import { getIdFromURL, getPageFromURL } from '../services/others';
import {
  fetchOneMeal,
  fetchOneDrink,
  fetchMealsAcompaniments,
  fetchDrinksAcompaniments } from '../services/api';
import RecipeVideo from '../components/RecipeVideo';

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
        {!recipe ? <p>loading</p> : (
          <div>
            <Details detailsContext={ detailsContextProps } />
            <RecipeVideo detailsContext={ detailsContextProps } />
            <RecomendedRecipes detailsContext={ detailsContextProps } />
          </div>
        )}
      </div>
    </section>
  );
}

export default RecipeDetails;
