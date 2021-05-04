import React, { useState, useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BottomMenu from '../components/BottomMenu';
import Header from '../components/Header';
import RecipesContext from '../contexts/RecipesContext';
import fetchIngredients from '../services/fetchIngredients';
import { searchRecipe, clearList } from '../actions';

const TWELVE = 12;

const ExplorarIngredientes = ({ setIngredient, clear }) => {
  const { setLoading } = useContext(RecipesContext);
  setLoading(true);
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

  const handleClick = async (ingredient) => {
    clear();
    await setIngredient('Ingrediente', ingredient, 'meal');
  };

  const renderMealCards = () => (
    ingredients.map((meal, index) => (
      index < TWELVE && (
        <Link
          to="/comidas"
          key={ index }
          onClick={ () => handleClick(meal.strIngredient) }
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
          onClick={ () => {
            setIngredient('Ingrediente', drink.strIngredient1, 'cocktail');
          } }
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
  clear: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  setIngredient: (type, text, category) => dispatch(searchRecipe(type, text, category)),
  clear: () => dispatch(clearList()),
});

export default connect(null, mapDispatchToProps)(ExplorarIngredientes);
