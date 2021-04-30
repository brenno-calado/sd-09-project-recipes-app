import React, { useEffect, useState } from 'react';
import { object, string } from 'prop-types';

// import Ingredients from '../components/Ingredients';
import ShareButton from '../components/ShareButton';
import { getFoodById } from '../services/FoodAPI';
import FavoriteButton from '../components/FavoriteButton';
import StartRecipeButton from '../components/StartRecipeButton';
// import RecomendationCard from '../components/RecomendationCard';

const FoodDetails = (props) => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const getMeals = async () => {
      const { id } = props.match.params;
      setMeals(await getFoodById(id));
    };
    getMeals();
  }, []);

  if (meals.length < 1) return <div>Loading...</div>;

  console.log(meals);

  const str = Object.keys(meals)
    .filter((key) => key.startsWith('strIngredient'))
    .filter((filteredKey) => meals[filteredKey] !== null && meals[filteredKey] !== '')
    .map((ingredients) => meals[ingredients]);

  console.log(str);

  // console.log(Object.keys(meals).filter((chave) => chave.startsWith('strIngredient')));

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ meals.strMealThumb }
        alt="imagem da receita"
        width="300"
        height="300"
      />
      <p data-testid="recipe-title">{meals.strMeal}</p>
      <ShareButton />
      <FavoriteButton />
      <p data-testid="recipe-category">{meals.strCategory}</p>
      {/* <Ingredients data-testid={ `${index}-ingredient-name-and-measure` } /> */}
      <p data-testid="instructions">{meals.strInstructions}</p>
      <iframe
        data-testid="video"
        width="320"
        height="240"
        title={ meals.strMeal }
        src={ meals.strYoutube
          && `https://www.youtube.com/embed/${meals.strYoutube.split('=')[1]}` }
        frameBorder="0"
        allow="accelerometer;
          autoplay;
          clipboard-write;
          encrypted-media;
          gyroscope;
          picture-in-picture"
        allowFullScreen
      />
      {/* <RecomendationCard data-testid={ `${index}-recomendation-card` } /> */}
      <StartRecipeButton data-testid="start-recipe-btn" />
    </div>
  );
};

FoodDetails.propTypes = {
  id: string,
  match: object,
  params: object,
}.isRequired;

export default FoodDetails;
