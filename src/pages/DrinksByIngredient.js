import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderFoods from '../components/HeaderFoods';
import BottomMenu from '../components/BottomMenu';
import { useRecipeContext } from '../contexts/recipeContext';
import styles from '../components/RecepiCard/recipesCard.module.css';

function DrinksByIngredient() {
  const {
    getIngredients,
    setCheckValue,
    setInputValue } = useRecipeContext();
  const [ingredients, setIngredients] = useState([]);
  const twelve = 12;

  useEffect(() => {
    getIngredients('thecocktaildb')
      .then(({ drinks }) => setIngredients(drinks));
    setCheckValue('ingredient');
  }, [getIngredients]);

  useEffect(() => {
    setInputValue();
  }, [setInputValue]);

  return (
    <>
      <HeaderFoods hassearchbar={ false }>
        <h1 data-testid="page-title">Explorar Ingredientes</h1>
      </HeaderFoods>
      <h1>Bebidas por ingrediente</h1>
      {ingredients.length && ingredients
        .map(({ strIngredient1 }, index) => index < twelve && (
          <Link to="/bebidas">
            <li
              className={ styles.recipeCArdId }
            >
              <button
                type="button"
                data-testid={ `${index}-ingredient-card` }
                onClick={ ({ target }) => {
                  setInputValue(target.alt);
                } }
              >
                <img
                  src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
                  alt={ strIngredient1 }
                  data-testid={ `${index}-card-img` }
                  className={ styles.recipeCArdId }
                />
              </button>
              <p
                data-testid={ `${index}-card-name` }
              >
                { strIngredient1 }
              </p>
            </li>
          </Link>
        )) }
      <BottomMenu />
    </>
  );
}

export default DrinksByIngredient;
