import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Link, useLocation } from 'react-router-dom';
import Loading from './Loading';
import { searchRecipe } from '../actions';
import '../styles/Recipes.css';

const MEAL = 'meal';
const TWELVE = 12;

function Recipes({
  recipesList = [],
  recipesType,
  dispatchSearch,
  redirect,
  load,
  type,
  query,
  searchBy }) {
  const category = useLocation().pathname;
  useEffect(() => {
    if (category === '/comidas' && recipesList.length === 0) {
      dispatchSearch(searchBy, query, type);
    }
    if (category === '/bebidas' && recipesList.length === 0) {
      dispatchSearch(searchBy, query, type);
    }
  }, [category, dispatchSearch, recipesList, type, query, searchBy]);

  if (load) return <Loading />;
  if (recipesList.length === 1 && redirect) {
    return recipesType === 'meal'
      ? <Redirect to={ `/comidas/${recipesList[0].idMeal}` } />
      : <Redirect to={ `/bebidas/${recipesList[0].idDrink}` } />;
  }

  return (
    <div className="card-content">
      {recipesType === MEAL
        ? recipesList.map((recipe, index) => (
          index < TWELVE && (
            <Link
              to={ `/comidas/${recipe.idMeal}` }
              key={ recipe.idMeal }
              className="card align-items-center"
            >
              <div
                data-testid={ `${index}-recipe-card` }
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
            <Link
              to={ `/bebidas/${recipe.idDrink}` }
              key={ recipe.idDrink }
              className="card align-items-center m-2 flex-wrap"
            >
              <div
                data-testid={ `${index}-recipe-card` }
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

const mapStateToProps = ({
  recipes: { recipesType, recipesList, redirect, load },
  apiParameters: { type, query, searchBy },
}) => ({
  recipesType,
  recipesList,
  redirect,
  load,
  type,
  query,
  searchBy,
});

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
