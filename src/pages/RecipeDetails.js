import { string } from 'prop-types';
import React, { useEffect, useState } from 'react';

import { getFoodById } from '../services/FoodAPI';
import Ingredients from '../components/Ingredients';
import ShareButton from '../components/ShareButton';
import { getDrinkById } from '../services/DrinksAPI';
import FavoriteButton from '../components/FavoriteButton';
import StartRecipeButton from '../components/StartRecipeButton';
import RecomendationCard from '../components/RecomendationCard';

const RecipeDetails = (props) => {
  const [recipeType, setRecipeType] = useState('');
  const [recipe, setRecipe] = useState([]);
  const { location: { pathname } } = props;
  const { match: { params: { id } } } = props;

  useEffect(() => {
    const getRecipeByType = async () => {
      if (pathname.startsWith('/comidas')) {
        const meals = await getFoodById(id);
        setRecipeType('Meal');
        setRecipe(meals.meals[0]);
      } else if (pathname.startsWith('/bebidas')) {
        const drinks = await getDrinkById(id);
        setRecipeType('Drink');
        setRecipe(drinks.drinks[0]);
      }
    };
    getRecipeByType();
  }, [id, pathname]);

  if (recipe.length === 0) {
    return <div className="spinner-border text-primary" role="status" />;
  }

  const recipeCategory = recipeType === 'Meal' ? 'strCategory' : 'strAlcoholic';

  const showVideo = () => {
    if (recipeType === 'Drink') return null;

    return (
      <iframe
        data-testid="video"
        width="320"
        height="240"
        title={ recipe.strMeal }
        src={ `https://www.youtube.com/embed/${recipe.strYoutube.split('=')[1]}` }
        frameBorder="0"
        allow="accelerometer;
          autoplay;
          clipboard-write;
          encrypted-media;
          gyroscope;
          picture-in-picture"
        allowFullScreen
      />
    );
  };

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ recipe[`str${recipeType}Thumb`] }
        alt="imagem da receita"
        width="300"
        height="300"
      />
      <p data-testid="recipe-title">{ recipe[`str${recipeType}`] }</p>
      <ShareButton />
      <FavoriteButton />
      <p data-testid="recipe-category">{ recipe[recipeCategory] }</p>
      <Ingredients recipe={ recipe } />
      <p data-testid="instructions">{ recipe.strInstructions }</p>
      { showVideo() }
      <RecomendationCard recipeType={ recipeType } />
      <StartRecipeButton
        data-testid="start-recipe-btn"
        pathname={ pathname }
      />
    </div>
  );
};

RecipeDetails.propTypes = {
  id: string,
}.isRequired;

export default RecipeDetails;
