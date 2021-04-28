import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import '../styles/Recipes.css';

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

  return (
    <div className="card-content">
      {recipesType === 'meal'
        ? recipesList.map((recipe, index) => (
          index < TWELVE && (
            <div
              className="card align-items-center m-2 flex-wrap"
              data-testid={ `${index}-recipe-card` }
              key={ recipe.idMeal }
            >
              <img
                data-testid={ `${index}-card-img` }
                src={ recipe.strMealThumb }
                alt={ recipe.srtMeal }
                width="100px"
                height="100px"
              />
              <span data-testid={ `${index}-card-name` } className="text-content">
                {recipe.strMeal}
              </span>
            </div>)))

        : recipesList.map((recipe, index) => (
          index < TWELVE && (
            <div
              className="card align-items-center m-2 flex-wrap"
              data-testid={ `${index}-recipe-card` }
              key={ recipe.idDrink }
            >
              <img
                data-testid={ `${index}-card-img` }
                src={ recipe.strDrinkThumb }
                alt={ recipe.strDrink }
                width="100px"
                height="100px"
              />
              <span className="card-title" data-testid={ `${index}-card-name` }>
                {recipe.strDrink}
              </span>
            </div>)))}

    </div>
  );
}

Recipes.propTypes = {
  recipes: PropTypes.arrayOf(Object),
}.isRequired;

const mapStateToProps = ({ recipes: { recipesType, recipesList } }) => ({
  recipesType,
  recipesList,
});

export default connect(mapStateToProps)(Recipes);
