import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BottomMenu from '../components/BottomMenu';
import Header from '../components/Header';
import fetchIngredients from '../services/fetchIngredients';
import { searchRecipe, loadFlag, recipeCase, recipeQuery, recipeType } from '../actions';

const TWELVE = 12;

const ExplorarIngredientes = ({
  setLoading,
  setRecipeCase,
  setRecipeQuery,
  setRecipeType }) => {
  const url = useLocation().pathname;
  const [ingredients, setIngredients] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      if (url.includes('comidas')) {
        const ingredientType = await fetchIngredients('meal');
        setIngredients(ingredientType.meals);
      } else {
        const ingredientType = await fetchIngredients('cocktail');
        setIngredients(ingredientType.drinks);
      }
    };
    fetch();
  }, [url]);

  const handleClick = (ingredient, type) => {
    setLoading(true);
    setRecipeCase('Ingrediente');
    setRecipeQuery(ingredient);
    setRecipeType(type);
    setLoading(false);
  };

  const renderMealCards = () => (
    ingredients.map((meal, index) => (
      index < TWELVE && (
        <Link
          to="/comidas"
          key={ index }
          onClick={ () => handleClick(meal.strIngredient, 'meal') }
        >
          <div
            data-testid={ `${index}-ingredient-card` }
          >
            <img
              src={ `https://www.themealdb.com/images/ingredients/${meal.strIngredient}-Small.png` }
              alt={ meal.strIngredient }
              data-testid={ `${index}-card-img` }
            />
            <p
              data-testid={ `${index}-card-name` }
            >
              {meal.strIngredient}
            </p>
          </div>
        </Link>
      )
    ))
  );

  const renderDrinkCards = () => (
    ingredients.map((drink, index) => (
      index < TWELVE && (
        <Link
          to="/bebidas"
          key={ index }
          onClick={ () => handleClick(drink.strIngredient1, 'cocktail') }
        >
          <div
            data-testid={ `${index}-ingredient-card` }
          >
            <img
              src={
                `https://www.thecocktaildb.com/images/ingredients/${drink.strIngredient1}-Small.png`
              }
              alt={ drink.strIngredient1 }
              data-testid={ `${index}-card-img` }
            />
            <p
              data-testid={ `${index}-card-name` }
            >
              {drink.strIngredient1}
            </p>
          </div>
        </Link>
      )
    ))
  );

  return (
    <>
      <Header />
      {url.includes('comidas') ? renderMealCards() : renderDrinkCards() }
      <BottomMenu />
    </>
  );
};

ExplorarIngredientes.propTypes = {
  setIngredient: PropTypes.func,
  setLoading: PropTypes.func,
  setRecipeType: PropTypes.func,
  setRecipeQuery: PropTypes.func,
  setRecipeCase: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  setIngredient: (type, text, category) => dispatch(searchRecipe(type, text, category)),
  setLoading: (bool) => dispatch(loadFlag(bool)),
  setRecipeType: (type) => dispatch(recipeType(type)),
  setRecipeQuery: (query) => dispatch(recipeQuery(query)),
  setRecipeCase: (searchBy) => dispatch(recipeCase(searchBy)),
});

export default connect(null, mapDispatchToProps)(ExplorarIngredientes);
