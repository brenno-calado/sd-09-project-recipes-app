import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Link, useLocation } from 'react-router-dom';
import { searchRecipe } from '../actions';
import '../styles/Recipes.css';

const TWELVE = 12;

function Recipes({
  recipesList = [], recipesType, dispatchSearch, redirect }) {
  const category = useLocation().pathname;
  useEffect(() => {
    if (category === '/comidas' && recipesList.length === 0) {
      dispatchSearch(null, null, 'meal');
    }
    if (category === '/bebidas' && recipesList.length === 0) {
      dispatchSearch(null, null, 'cocktail');
    }
  }, [category, dispatchSearch, recipesList]);
  if (!recipesList) {
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }

  if (recipesList.length === 1 && redirect) {
    return recipesType === 'meal'
      ? <Redirect to={ `/comidas/${recipesList[0].idMeal}` } />
      : <Redirect to={ `/bebidas/${recipesList[0].idDrink}` } />;
  }

  return (
    <div className="card-content">
      {recipesType === 'meal'
        ? recipesList.map((recipe, index) => (
          index < TWELVE && (
            <Link to={ `/comidas/${recipe.idMeal}` }>
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
              </div>
            </Link>)))

        : recipesList.map((recipe, index) => (
          index < TWELVE && (
            <Link to={ `/bebidas/${recipe.idDrink}` }>
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
              </div>
            </Link>)))}

    </div>
  );
}

Recipes.propTypes = {
  recipes: PropTypes.arrayOf(Object),
  dispatchSearch: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  dispatchSearch: (type, text, category) => (
    dispatch(searchRecipe(type, text, category))
  ),
});

const mapStateToProps = ({ recipes: { recipesType, recipesList, redirect } }) => ({
  recipesType,
  recipesList,
  redirect,
});

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
