import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  exploreByIngredientMealsThunk,
  exploreByIngredientCocktailsThunk,
  fromExplore,
} from '../redux/actions/actionsExplore';
import {
  mealsThunk,
  cocktailsThunk,
  changePath,
} from '../redux/actions/index';
import Footer from '../components/Footer';
import Header from '../components/Header';

const ExploreByIngredients = ({
  getIngredientsMealsDispatcher,
  getIngredientsCocktailsDispatcher,
  location,
  ingredients,
  mealsThunkDispatcher,
  cocktailsThunkDispatcher,
  fromExploreDispatcher,
  pathnameDispatcher,
}) => {
  const { pathname } = location;
  const [redirect, setRedirect] = useState(false);
  const [redirectPath, setRedirectPath] = useState('');
  useEffect(() => {
    if (pathname.includes('/comidas')) {
      getIngredientsMealsDispatcher();
      pathnameDispatcher(pathname, 'comidas');
    }
    if (pathname.includes('/bebidas')) {
      getIngredientsCocktailsDispatcher();
      pathnameDispatcher(pathname, 'bebidas');
    }
  }, [location]);

  const handleClick = async ({ target: { name } }) => {
    if (name === undefined) return;
    if (pathname.includes('/comidas')) {
      fromExploreDispatcher(true);
      mealsThunkDispatcher('ingredient-search', name);
      setRedirectPath('/comidas');
      setRedirect(true);
    }
    if (pathname.includes('/bebidas')) {
      fromExploreDispatcher(true);
      cocktailsThunkDispatcher('ingredient-search', name);
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

  const redirectTeste = () => (<Redirect to={ redirectPath } />);

  return (
    <div>
      <Header title="Explorar Ingredientes" />
      { (pathname.includes('/comidas')) ? mealsCards : cocktailsCards}
      { redirect && redirectTeste() }
      <Footer />
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
  fromExploreDispatcher: (bool) => dispatch(fromExplore(bool)),
  pathnameDispatcher:
  (pathname, recipeType) => dispatch(changePath(pathname, recipeType)),
});

ExploreByIngredients.propTypes = {
  getIngredientsMealsDispatcher: PropTypes.func.isRequired,
  getIngredientsCocktailsDispatcher: PropTypes.func.isRequired,
  mealsThunkDispatcher: PropTypes.func.isRequired,
  cocktailsThunkDispatcher: PropTypes.func.isRequired,
  location: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
  fromExploreDispatcher: PropTypes.func.isRequired,
  pathnameDispatcher: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExploreByIngredients);
