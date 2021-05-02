import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { number, string } from 'prop-types';
import RecipesContext from '../Provider/RecipesContext';

function IngredientCard({ ingredient, db, index, linkType }) {
  const { fetchFoodsByIngredient, fetchDrinksByIngredient } = useContext(RecipesContext);

  function handleIngredientClick() {
    if (linkType === 'comidas') fetchFoodsByIngredient(ingredient);
    else fetchDrinksByIngredient(ingredient);
  }

  return (
    <Link
      to={ `/${linkType}` }
      data-testid={ `${index}-ingredient-card` }
      onClick={ handleIngredientClick }
    >
      <img
        data-testid={ `${index}-card-img` }
        src={ `https://www.${db}.com/images/ingredients/${ingredient}-Small.png` }
        alt={ ingredient }
      />
      <p data-testid={ `${index}-card-name` }>{ingredient}</p>
    </Link>
  );
}

IngredientCard.propTypes = {
  ingredient: string,
  db: string,
  index: number,
  linkType: string,
}.isRequired;

export default IngredientCard;
