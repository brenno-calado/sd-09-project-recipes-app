import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Link, useLocation } from 'react-router-dom';
import Loading from './Loading';
import { searchRecipe } from '../actions';
import RecipesContext from '../contexts/RecipesContext';
import '../styles/Recipes.css';

const MEAL = 'meal';
const TWELVE = 12;

// const condicionais = (category, dispatchSearch, recipesList, setLoading) => {
//   if (category === '/comidas' && recipesList.length === 0) {
//     setLoading(true);
//     dispatchSearch(null, null, 'meal');
//     setLoading(false);
//   }
//   if (category === '/bebidas' && recipesList.length === 0) {
//     setLoading(true);
//     dispatchSearch(null, null, 'cocktail');
//     setLoading(false);
//   }
// };

function Recipes({
  recipesList = [], recipesType, dispatchSearch, redirect }) {
  const { isLoading, setLoading } = useContext(RecipesContext);
  const [first, setFirst] = useState(true);
  const category = useLocation().pathname;
  useEffect(() => {
    if (category === '/comidas' && first) {
      setFirst(false);
      dispatchSearch(null, null, 'meal');
    }
    if (category === '/bebidas' && recipesList.length === 0 && first) {
      setFirst(false);
      dispatchSearch(null, null, 'cocktail');
    }
    // condicionais(category, dispatchSearch, recipesList, setLoading);
  }, [category, dispatchSearch, recipesList, setLoading, first]);

  // useEffect(() => {
  //   setLoading(false);
  // }, []);
  console.log(isLoading);
  if (isLoading && recipesList.length === 0) return <Loading />;
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
  recipes: { recipesType, recipesList, redirect },
  setExploredIngredient: { ingredient } }) => ({
  recipesType,
  recipesList,
  redirect,
  ingredient,
});

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
