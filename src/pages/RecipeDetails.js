import { object, string } from 'prop-types';
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

  const getRecipeByType = async () => {
    const { id } = props.match.params;

    if (pathname.startsWith('/comidas')) {
      try {
        const meals = await getFoodById(id);
        setRecipeType('Meal');
        setRecipe(meals.meals[0]);
      } catch (error) {
        console.log(error);
      }
    } else if (pathname.startsWith('/bebidas')) {
      try {
        const drinks = await getDrinkById(id);
        setRecipeType('Drink');
        setRecipe(drinks.drinks[0]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getRecipeByType();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (recipe.length === 0) return <div>Loading...</div>;

  const recipeCategory = recipeType === 'Meal' ? 'strCategory' : 'strAlcoholic';

  const showVideo = () => {
    if (recipeType === 'Meal') {
      return (
        <iframe
          data-testid="video"
          width="320"
          height="240"
          title={ recipe.strMeal }
          src={ recipe.strYoutube
            && `https://www.youtube.com/embed/${recipe.strYoutube.split('=')[1]}` }
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
    }
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
  match: object,
  params: object,
}.isRequired;

export default RecipeDetails;
