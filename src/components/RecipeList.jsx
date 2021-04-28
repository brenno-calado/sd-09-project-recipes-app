import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mealsThunk, cocktailsThunk } from '../redux/actions';

function RecipeList({
  data, recipeType, mealsThunkDispatcher, cocktailsThunkDispatcher,
}) {
  const [recipes, setRecipes] = useState([]);

  const verifyRecipes = useCallback(() => {
    const magicNumber = 12;
    const results = data.slice(0, magicNumber);
    setRecipes(results);
  }, [data]);

  useEffect(() => {
    verifyRecipes();
  }, [data, verifyRecipes]);

  useEffect(() => {
    if (recipeType === 'meals') {
      mealsThunkDispatcher('', '');
    }
    if (recipeType === 'cocktails') {
      cocktailsThunkDispatcher('', '');
    }
  }, [recipeType]);

  const mealsCards = (
    recipes.map((recipe, index) => (
      <div key={ recipe.idMeal } data-testid={ `${index}-recipe-card` }>
        <p data-testid={ `${index}-card-name` }>{ recipe.strMeal }</p>
        <img
          src={ recipe.strMealThumb }
          alt="foto da receita"
          data-testid={ `${index}-card-img` }
        />
      </div>
    ))
  );

  const cocktailsCards = (
    recipes.map((recipe, index) => (
      <div key={ recipe.idDrink } data-testid={ `${index}-recipe-card` }>
        <p data-testid={ `${index}-card-name` }>{ recipe.strDrink }</p>
        <img
          src={ recipe.strDrinkThumb }
          alt="foto da receita"
          data-testid={ `${index}-card-img` }
        />
      </div>
    ))
  );

  return (
    <section>
      { (recipeType === 'meals') ? mealsCards : cocktailsCards }
    </section>
  );
}

const mapStateToProps = (state) => ({
  data: state.loginReducer.data,
  recipeType: state.loginReducer.recipeType,
});

const mapDispatchToProps = (dispatch) => ({
  mealsThunkDispatcher:
    (radioSearch, textSearch) => dispatch(mealsThunk(radioSearch, textSearch)),
  cocktailsThunkDispatcher:
    (radioSearch, textSearch) => dispatch(cocktailsThunk(radioSearch, textSearch)),
});

RecipeList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  recipeType: PropTypes.string.isRequired,
  mealsThunkDispatcher: PropTypes.func.isRequired,
  cocktailsThunkDispatcher: PropTypes.func.isRequired,
};

RecipeList.defaultProps = {
  data: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList);
