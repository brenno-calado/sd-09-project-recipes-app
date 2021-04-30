import React, { useEffect, useState } from 'react';
import { object, string } from 'prop-types';

import Ingredients from '../components/Ingredients';
import ShareButton from '../components/ShareButton';
import { getDrinkById } from '../services/DrinksAPI';
import FavoriteButton from '../components/FavoriteButton';
import StartRecipeButton from '../components/StartRecipeButton';
// import RecomendationCard from '../components/RecomendationCard';

const DrinkDetails = (props) => {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    const getDrinks = async () => {
      const { id } = props.match.params;
      setDrinks(await getDrinkById(id));
    };
    getDrinks();
  }, []);

  if (drinks.length < 1) return <div>Loading...</div>;
  console.log(drinks);
  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ drinks.strDrinkThumb }
        alt="imagem da receita"
        width="300"
        height="300"
      />
      <p data-testid="recipe-title">{drinks.strDrink}</p>
      <ShareButton />
      <FavoriteButton />
      <p data-testid="recipe-category">{drinks.strAlcoholic}</p>
      <Ingredients />
      <p data-testid="instructions">{drinks.strInstructions}</p>
      {/* <RecomendationCard data-testid={ `${index}-recomendation-card` } /> */}
      <StartRecipeButton data-testid="start-recipe-btn" />
    </div>
  );
};

DrinkDetails.propTypes = {
  id: string,
  match: object,
  params: object,
}.isRequired;

export default DrinkDetails;
