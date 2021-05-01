import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Header from '../components/Header/index';
import Menu from '../components/Menu';
import { getFoodIngredientsList } from '../services/FoodAPI';
import { getDrinksIngredientsList } from '../services/DrinksAPI';
import Ingredients from '../components/Ingredients/Index';

const ExploreIngredients = ({ match }) => {
  const [ingredientsList, setIngredientsList] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const explorerPath = (match.path).split('/')[2];
  const MAX_INGREDIENTS = 12;

  const getMealsIngredientsList = async () => {
    const rootURL = 'https://www.themealdb.com/images/ingredients/';
    const ingredientsListAPI = await getFoodIngredientsList();
    ingredientsListAPI.splice(MAX_INGREDIENTS, ingredientsListAPI.length);
    const customIngredientsList = ingredientsListAPI.map((ingredient) => {
      const customIngredient = { name: ingredient.strIngredient };
      const thumbnailURL = `${rootURL}${ingredient.strIngredient}-Small.png`;
      customIngredient.thumbnailURL = thumbnailURL;
      return customIngredient;
    });
    setIngredientsList(customIngredientsList);
    setIsLoading(false);
  };

  const getBeveragesIngredientsList = async () => {
    const rootURL = 'https://www.thecocktaildb.com/images/ingredients/';
    const ingredientsListAPI = await getDrinksIngredientsList();
    ingredientsListAPI.splice(MAX_INGREDIENTS, ingredientsListAPI.length);
    const customIngredientsList = ingredientsListAPI.map((ingredient) => {
      const name = ingredient.strIngredient1;
      const customIngredient = { name };
      const thumbnailURL = `${rootURL}${name}-Small.png`;
      customIngredient.thumbnailURL = thumbnailURL;
      return customIngredient;
    });
    setIngredientsList(customIngredientsList);
    setIsLoading(false);
  };

  if (isLoading && explorerPath === 'comidas') { getMealsIngredientsList(); }
  if (isLoading && explorerPath === 'bebidas') { getBeveragesIngredientsList(); }

  return (
    ingredientsList
      ? (
        <div>
          <Header title="Explorar Ingredientes" />
          <br />
          <div className="cards">
            <Ingredients
              ingredientsList={ ingredientsList }
              explorerPath={ explorerPath }
            />
          </div>
          <Menu />
        </div>
      )
      : <span>Loading...</span>
  );
};
ExploreIngredients.propTypes = {
  match: PropTypes.shape().isRequired,
};
export default ExploreIngredients;
