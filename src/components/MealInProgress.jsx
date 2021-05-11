import React, { useState, useEffect } from 'react';
import clipboard from 'clipboard-copy';
import { getById } from '../services/MealFetch';
import localStorageProgress from './InitialLocalStorage';
import Favorite from './Favorite';

import ShareIcon from '../images/shareIcon.svg';

function ProcessoComida() {
  const [oneFood, setOneFood] = useState([]);
  const [showMessage, setShowMessage] = useState('none');
  const [disableButton, setDisableButton] = useState(true);

  const id = window.location.href.match(/[0-9]{5,9}/g);
  const getLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  let ingredientsUsed;
  const favoriteObject = {
    id: oneFood.idMeal,
    type: 'comida',
    area: oneFood.strArea,
    category: oneFood.strCategory,
    alcoholicOrNot: '',
    name: oneFood.strMeal,
    image: oneFood.strMealThumb,
  };
  const values = [];

  const checkboxes = () => {
    const totalChecked = (getLocalStorage.meals[id].length);
    const totalBoxes = values.length;

    if (totalChecked === totalBoxes) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  };

  const listIngredients = ({ target: { value } }) => {
    ingredientsUsed = getLocalStorage.meals[id] || [];

    if (ingredientsUsed.includes(value)) {
      ingredientsUsed = ingredientsUsed.filter((ingredient) => ingredient !== value);
    } else {
      ingredientsUsed.push(value);
    }

    getLocalStorage.meals[id] = ingredientsUsed;

    localStorage.setItem('inProgressRecipes', JSON.stringify(getLocalStorage));

    checkboxes();
  };

  const checkDefault = (value) => {
    const ingredintsList = getLocalStorage.meals[id] || [];
    if (ingredintsList.includes(value)) return true;
  };

  const ingredients = () => {
    const regIngredient = /strIngredient/;
    const filterKeys = Object.keys(oneFood);
    const filterValues = Object.values(oneFood);

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
  };

  const shareButton = () => {
    const timer = 2000;
    clipboard(window.location.href.replace(/\/in-progress/, ''));
    setShowMessage('inline');
    setTimeout(() => {
      setShowMessage('none');
    }, timer);
  };

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

      <button
        data-testid="share-btn"
        type="button"
        onClick={ shareButton }
      >
        <img src={ ShareIcon } alt="Share" />
        <span
          style={ { display: `${showMessage}` } }
        >
          Link copiado!
        </span>
      </button>

      <Favorite recipe={ favoriteObject } />

      <h3 data-testid="recipe-category">{ oneFood.Category }</h3>

      <h2>Ingredientes:</h2>

      { ingredients() }

      <p data-testid="instructions">
        Instruções
      </p>

      <button
        data-testid="finish-recipe-btn"
        type="button"
        disabled={ disableButton }
      >
        Finalizar Receita
      </button>
    </>
  );
}

export default ProcessoComida;
