import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Media, Spinner } from 'react-bootstrap';
import HeaderFoods from '../components/HeaderFoods';
import BottomMenu from '../components/BottomMenu';
import { useRecipeContext } from '../contexts/recipeContext';
import styles from '../utils/headerRenderFoodAndDrinks.module.css';

function DrinksByIngredient() {
  const {
    getIngredients,
    setCheckValue,
    setInputValue } = useRecipeContext();
  const [ingredients, setIngredients] = useState([]);
  const [redirectByIngredient, shouldRedirectByIngredient] = useState(false);
  const twelve = 12;

  useEffect(() => {
    getIngredients('thecocktaildb')
      .then(({ drinks }) => setIngredients(drinks));
    setCheckValue('ingredient');
  }, [getIngredients]);

  useEffect(() => {
    setInputValue();
  }, [setInputValue]);

  function exploreByIngredient() {
    shouldRedirectByIngredient(true);
  }

  if (redirectByIngredient) {
    return <Redirect to="/bebidas" />;
  }

  return (
    <div style={ { marginLeft: '-36px', marginBottom: '65px' } }>
      <HeaderFoods hasSearchBar={ false }>
        <h3 data-testid="page-title">Explorar Ingredientes</h3>
      </HeaderFoods>
      {ingredients.length ? (ingredients
        .map(({ strIngredient1 }, index) => index < twelve && (
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
                style={ { objectFit: 'cover' } }
                src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
                alt={ strIngredient1 }
                data-testid={ `${index}-card-img` }
              />
            </button>
            <Media.Body style={ { overflow: 'auto' } }>
              <p
                style={ { marginTop: '17%' } }
                data-testid={ `${index}-card-name` }
              >
                { strIngredient1 }
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

export default DrinksByIngredient;
