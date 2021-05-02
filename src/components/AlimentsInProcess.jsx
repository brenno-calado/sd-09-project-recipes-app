import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getIngredients } from '../services/functions';
import ShareButton from './ShareButton';
import FavoriteRecipes from './FavoriteRecipes';

function AlimentsInProcess({ data }) {
  const { href } = window.location;
  const sliceMax = -12;
  const ingredients = getIngredients(data, 'strIngredient').map((e) => e[1]);
  // const ingredientsMeasures = getIngredients(data, 'strMeasure').map((e) => e[1]);
  const { pathname } = useLocation();
  const [keys, setKeys] = useState([]);

  function saveState() {
    if (pathname.includes('/comidas')) {
      const { strMealThumb, strMeal, strCategory } = data;
      const obj = [{
        image: strMealThumb,
        title: strMeal,
        category: strCategory,
      }];
      setKeys(obj);
    } else {
      const { strDrinkThumb, strDrink, strCategory } = data;
      const obj = [{
        image: strDrinkThumb,
        title: strDrink,
        category: strCategory,
      }];
      setKeys(obj);
    }
  }

  useEffect(() => {
    saveState();
  }, []);

  if (keys.length > 0) {
    return (
      <div>
        <img src={ keys[0].image } alt="thumb" data-testid="recipe-photo" width="200px" />
        <h3 data-testid="recipe-title">{ keys[0].title }</h3>
        <ShareButton dataTestId="share-btn" urlCopied={ href } />
        <FavoriteRecipes data={ data } path={ pathname.slice(sliceMax) } />
        <p data-testid="recipe-category">{ keys[0].category }</p>
        <ul>
          { ingredients.map((element, index) => (
            <li
              key={ element }
              data-testid={ `data-testid=${index}-ingredient-step` }
            >
              <label htmlFor="ingredients">
                { element }
                <input type="checkbox" id="ingredients" name="ingredients" />
              </label>
            </li>)) }
        </ul>
        <p data-testid="instructions">{ data.strInstructions }</p>
        <button type="button" data-testid="finish-recipe-btn">Finalizar Receita!</button>
      </div>
    );
  }

  return (
    <div>a</div>
  );
}

AlimentsInProcess.propTypes = {
  data: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default AlimentsInProcess;
