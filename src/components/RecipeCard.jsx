import React from 'react';
import { objectOf, string, number } from 'prop-types';
import { Link } from 'react-router-dom';

function RecipeCard({ recipe, index, recipeType }) {
  const type = recipeType === 'meals' ? 'Meal' : 'Drink';
  const redirectLink = recipeType === 'meals' ? 'comidas' : 'bebidas';
  console.log(type);
  function handleCardClick() {
    // event.preventDefault();
  }

  function renderRecipeImage() {
    return (
      <img
        data-testid={ `${index}-card-img` }
        src={ recipe[`str${type}Thumb`] }
        alt={ recipe[`str${type}`] }
        style={ { width: '100px' } }
      />
    );
  }

  function renderRecipeName() {
    return (
      <h3 data-testid={ `${index}-card-name` }>{recipe[`str${type}`]}</h3>
    );
  }
  return (
    <Link
      to={ `/${redirectLink}/${recipe[`id${type}`]}` }
      onClick={ handleCardClick }
      data-testid={ `${index}-recipe-card` }
    >
      {renderRecipeImage()}
      {renderRecipeName()}
    </Link>
  );
}

RecipeCard.propTypes = {
  recipe: objectOf(string),
  index: number,
  recipeType: string,
}.isRequired;

export default RecipeCard;
