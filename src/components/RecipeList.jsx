import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { mealsThunk, cocktailsThunk, setError } from '../redux/actions';

function RecipeList({
  data,
  recipeType,
  mealsThunkDispatcher,
  cocktailsThunkDispatcher,
  pathname,
  error,
  setErrorDispatcher,
  currentCategory,
}) {
  const [recipes, setRecipes] = useState([]);

  const verifyRecipes = useCallback(() => {
    const magicNumber = 12;
    const results = data.slice(0, magicNumber);
    setRecipes(results);
  }, [data]);

  console.log(recipes);

  useEffect(() => {
    verifyRecipes();
  }, [data]);

  useEffect(() => {
    if (recipeType === 'comidas' && data.length === 0 && !error) {
      mealsThunkDispatcher('', '');
    }
    if (recipeType === 'bebidas' && data.length === 0 && !error) {
      cocktailsThunkDispatcher('', '');
    }
    if (error) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      setErrorDispatcher();
    }
  }, [recipeType, data]);

  const mealsCards = (
    recipes.map((recipe, index) => (
      <Link to={ `/comidas/${recipe.idMeal}` } key={ `${recipe.idMeal}/${index}` }>
        <div key={ recipe.idMeal } data-testid={ `${index}-recipe-card` }>
          <p data-testid={ `${index}-card-name` }>{recipe.strMeal}</p>
          <img
            src={ recipe.strMealThumb }
            alt="foto da receita"
            data-testid={ `${index}-card-img` }
          />
        </div>
      </Link>
    ))
  );

  const cocktailsCards = (
    recipes.map((recipe, index) => (
      <Link to={ `/bebidas/${recipe.idDrink}` } key={ `${recipe.idDrink}/${index}` }>
        <div key={ recipe.idDrink } data-testid={ `${index}-recipe-card` }>
          <p data-testid={ `${index}-card-name` }>{recipe.strDrink}</p>
          <img
            src={ recipe.strDrinkThumb }
            alt="foto da receita"
            data-testid={ `${index}-card-img` }
          />
        </div>
      </Link>
    ))
  );

  if (data.length === 1 && currentCategory === '') {
    return (<Redirect
      to={ recipeType === 'comidas' ? (
        `${pathname}/${data[0].idMeal}`
      ) : (
        `${pathname}/${data[0].idDrink}`
      ) }
    />);
  }
  return (
    <section>
      { (recipeType === 'comidas') ? mealsCards : cocktailsCards }
    </section>
  );
}

const mapStateToProps = (state) => ({
  data: state.recipesReducer.data,
  recipeType: state.recipesReducer.recipeType,
  pathname: state.recipesReducer.pathname,
  error: state.recipesReducer.error,
  currentCategory: state.recipesReducer.currentCategory,
});

const mapDispatchToProps = (dispatch) => ({
  mealsThunkDispatcher:
    (radioSearch, textSearch) => dispatch(mealsThunk(radioSearch, textSearch)),
  cocktailsThunkDispatcher:
    (radioSearch, textSearch) => dispatch(cocktailsThunk(radioSearch, textSearch)),
  setErrorDispatcher: () => dispatch(setError()),
});

RecipeList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  recipeType: PropTypes.string.isRequired,
  mealsThunkDispatcher: PropTypes.func.isRequired,
  cocktailsThunkDispatcher: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
  setErrorDispatcher: PropTypes.func.isRequired,
  currentCategory: PropTypes.string.isRequired,
};

RecipeList.defaultProps = {
  data: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList);
