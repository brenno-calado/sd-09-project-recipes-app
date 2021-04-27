import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

const TWELVE = 12;

function Recipes({ recipesList, recipesType }) {
  if (!recipesList) {
    return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }

  if (recipesList.length === 1) {
    return recipesType === 'meal'
      ? <Redirect to={ `/comidas/${recipesList[0].idMeal}` } />
      : <Redirect to={ `/bebidas/${recipesList[0].idDrink}` } />;
  }

  return recipesType === 'meal'
    ? recipesList.map((recipe, index) => (
      index < TWELVE && (
        <div
          data-testid={ `${index}-recipe-card` }
          key={ recipe.idMeal }
        >
          <span data-testid={ `${index}-card-name` }>{recipe.strMeal}</span>
          <img
            data-testid={ `${index}-card-img` }
            src={ recipe.strMealThumb }
            alt={ recipe.srtMeal }
            width="100px"
            height="100px"
          />
        </div>)))

    : recipesList.map((recipe, index) => (
      index < TWELVE && (
        <div
          data-testid={ `${index}-recipe-card` }
          key={ recipe.idDrink }
        >
          <span data-testid={ `${index}-card-name` }>{recipe.strDrink}</span>
          <img
            data-testid={ `${index}-card-img` }
            src={ recipe.strDrinkThumb }
            alt={ recipe.strDrink }
            width="100px"
            height="100px"
          />
        </div>)));
}

Recipes.propTypes = {
  recipes: PropTypes.arrayOf(Object),
}.isRequired;

const mapStateToProps = ({ recipes: { recipesType, recipesList } }) => ({
  recipesType,
  recipesList,
});

export default connect(mapStateToProps)(Recipes);
