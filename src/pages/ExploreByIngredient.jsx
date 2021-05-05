import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  exploreByIngredientMealsThunk,
  exploreByIngredientCocktailsThunk,
} from '../redux/actions/actionsExplore';
import {
  mealsThunk,
  cocktailsThunk,
} from '../redux/actions/index';

const ExploreByIngredients = ({
  getIngredientsMealsDispatcher,
  getIngredientsCocktailsDispatcher,
  location,
  ingredients,
  mealsThunkDispatcher,
  cocktailsThunkDispatcher,
}) => {
  const { pathname } = location;
  const [redirect, setRedirect] = useState(false);
  const [redirectPath, setRedirectPath] = useState('');
  useEffect(() => {
    if (pathname.includes('/comidas')) {
      getIngredientsMealsDispatcher();
    }
    if (pathname.includes('/bebidas')) {
      getIngredientsCocktailsDispatcher();
    }
  }, [location]);

  const handleClick = async ({ target: { name } }) => {
    if (name === undefined) return;
    console.log(name);
    if (pathname.includes('/comidas')) {
      await mealsThunkDispatcher('ingredient-search', name);
      setRedirectPath('/comidas');
      setRedirect(true);
    }
    if (pathname.includes('/bebidas')) {
      console.log(name);
      await cocktailsThunkDispatcher('ingredient-search', name);
      setRedirectPath('/bebidas');
      setRedirect(true);
    }
  };
  const magicNumber = 12;
  const mealsCards = (
    ingredients.slice(0, magicNumber).map((ingredient, index) => (
      <button
        key={ ingredient.idIngredient }
        data-testid={ `${index}-ingredient-card` }
        name={ ingredient.strIngredient }
        type="button"
        onClick={ handleClick }
      >
        <p
          name={ ingredient.strIngredient }
          data-testid={ `${index}-card-name` }
        >
          { ingredient.strIngredient }
        </p>
        <img
          src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
          name={ ingredient.strIngredient }
          alt="foto da receita"
          data-testid={ `${index}-card-img` }
        />
      </button>
    ))
  );

  const cocktailsCards = (
    ingredients.slice(0, magicNumber).map((ingredient, index) => (
      <button
        key={ ingredient.strIngredient1 }
        data-testid={ `${index}-ingredient-card` }
        name={ ingredient.strIngredient1 }
        type="button"
        onClick={ handleClick }
      >
        <p
          data-testid={ `${index}-card-name` }
          name={ ingredient.strIngredient1 }
        >
          {ingredient.strIngredient1 }
        </p>
        <img
          src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
          alt="foto da receita"
          name={ ingredient.strIngredient1 }
          data-testid={ `${index}-card-img` }
        />
      </button>
    ))
  );

  const redirectTeste = () => {
    console.log('teste');
    return <Redirect to={ redirectPath } />;
  };

  return (
    <div>
      Explorar Por Ingredientes
      { (pathname.includes('/comidas')) ? mealsCards : cocktailsCards}
      { redirect && redirectTeste() }
    </div>
  );
};

const mapStateToProps = (state) => ({
  ingredients: state.exploreRecipeReducer.explore,
});

const mapDispatchToProps = (dispatch) => ({
  getIngredientsMealsDispatcher: () => dispatch(exploreByIngredientMealsThunk()),
  getIngredientsCocktailsDispatcher: () => dispatch(exploreByIngredientCocktailsThunk()),
  mealsThunkDispatcher:
  (typeSearch, textSearch) => dispatch(mealsThunk(typeSearch, textSearch)),
  cocktailsThunkDispatcher:
  (typeSearch, textSearch) => dispatch(cocktailsThunk(typeSearch, textSearch)),

});

ExploreByIngredients.propTypes = {
  getIngredientsMealsDispatcher: PropTypes.func.isRequired,
  getIngredientsCocktailsDispatcher: PropTypes.func.isRequired,
  mealsThunkDispatcher: PropTypes.func.isRequired,
  cocktailsThunkDispatcher: PropTypes.func.isRequired,
  location: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExploreByIngredients);
