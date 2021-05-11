import React, { useState, useEffect } from 'react';
import { getById } from '../services/MealFetch';
import localStorageProgress from './InitialLocalStorage';

import ShareIcon from '../images/shareIcon.svg';
import WhiteHeartIcon from '../images/whiteHeartIcon.svg';
// import BlackHeartIcon from '../images/blackHeartIcon.svg';

function ProcessoComida() {
  const [oneFood, setOneFood] = useState([]);

  const id = window.location.href.match(/[0-9]{5,9}/g);
  const getLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  let ingredientsUsed;

  const listIngredients = ({ target: { value } }) => {
    ingredientsUsed = getLocalStorage.meals[id] || [];

    if (ingredientsUsed.includes(value)) {
      ingredientsUsed = ingredientsUsed.filter((ingredient) => ingredient !== value);
    } else {
      ingredientsUsed.push(value);
    }

    getLocalStorage.meals[id] = ingredientsUsed;

    localStorage.setItem('inProgressRecipes', JSON.stringify(getLocalStorage));
  };

  const checkDefault = (value) => {
    const ingredintsList = getLocalStorage.meals[id] || [];
    if (ingredintsList.includes(value)) return true;
  };

  function ingredients() {
    const regIngredient = /strIngredient/;
    const filterKeys = Object.keys(oneFood);
    const filterValues = Object.values(oneFood);
    const values = [];

    filterKeys.forEach((key, index) => {
      if (key.match(regIngredient) && filterValues[index]) {
        values.push(filterValues[index]);
      }
    });

    return (
      values.map((value, index) => (
        <div key={ Math.random() }>
          <label
            htmlFor={ value }
            data-testid={ `${index}-ingredient-step` }
          >
            <input
              type="checkbox"
              id={ value }
              value={ value }
              onClick={ listIngredients }
              defaultChecked={ checkDefault(value) }
            />
            { value }
          </label>
          <br />
        </div>
      ))
    );
  }

  useEffect(() => {
    const url = window.location.href;
    const match = url.match(/[0-9]{5,9}/g);
    getById(Number(match)).then((response) => setOneFood(response[0]));
    localStorageProgress();
  }, []);

  return (
    <>
      <img
        data-testid="recipe-photo"
        src={ oneFood.strMealThumb }
        alt={ `Imagem do prato ${oneFood.strMeal}` }
        style={ { width: '150px' } }
      />

      <h1 data-testid="recipe-title">{ oneFood.strMeal }</h1>

      <button data-testid="share-btn" type="button">
        <img src={ ShareIcon } alt="Share" />
      </button>

      <button data-testid="favorite-btn" type="button">
        <img src={ WhiteHeartIcon } alt="Favorite" />
      </button>

      <h3 data-testid="recipe-category">{ oneFood.Category }</h3>

      <h2>Ingredientes:</h2>

      { ingredients() }

      <p data-testid="instructions">
        Instruções
      </p>

      <button data-testid="finish-recipe-btn" type="button">Finalizar Receita</button>
    </>
  );
}

export default ProcessoComida;
