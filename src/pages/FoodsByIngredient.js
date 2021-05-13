import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Media, Spinner } from 'react-bootstrap';
import HeaderFoods from '../components/HeaderFoods';
import BottomMenu from '../components/BottomMenu';
import { useRecipeContext } from '../contexts/recipeContext';
import styles from '../utils/headerRenderFoodAndDrinks.module.css';

function FoodsByIngredient() {
  const {
    getIngredients,
    setCheckValue,
    setInputValue } = useRecipeContext();
  const [ingredients, setIngredients] = useState([]);
  const [redirectByIngredient, shouldRedirectByIngredient] = useState(false);

  const twelve = 12;

  useEffect(() => {
    getIngredients('themealdb')
      .then(({ meals }) => setIngredients(meals));
    setCheckValue('ingredient');
  }, [getIngredients]);

  useEffect(() => {
    setInputValue();
  }, [setInputValue]);

  function exploreByIngredient() {
    shouldRedirectByIngredient(true);
  }

  if (redirectByIngredient) {
    return <Redirect to="/comidas" />;
  }

  return (
    <div style={ { marginLeft: '-36px', marginBottom: '65px' } }>
      <HeaderFoods hasSearchBar={ false }>
        <h3 data-testid="page-title">Explorar Ingredientes</h3>
      </HeaderFoods>
      {ingredients.length ? (ingredients
        .map(({ strIngredient }, index) => index < twelve && (
          <Media style={ { padding: '8px' } }>
            <button
              style={ { background: 'transparent', border: 'none' } }
              className="mr-3"
              type="button"
              data-testid={ `${index}-ingredient-card` }
              onClick={ ({ target }) => {
                setInputValue(target.alt);
                exploreByIngredient();
              } }
            >
              <img
                src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
                alt={ strIngredient }
                data-testid={ `${index}-card-img` }
              />
            </button>
            <Media.Body style={ { overflow: 'auto' } }>
              <p
                style={ { marginTop: '17%' } }
                data-testid={ `${index}-card-name` }
              >
                { strIngredient }
              </p>
            </Media.Body>
          </Media>
        )))
        : (
          <Spinner className={ styles.sniper } animation="grow" variant="danger">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) }
      <BottomMenu />
    </div>
  );
}

export default FoodsByIngredient;
