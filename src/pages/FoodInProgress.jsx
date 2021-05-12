import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import fetchApi from '../services/index';
import BlackHartIcon from '../images/blackHeartIcon.svg';
import WhiteHartIcon from '../images/whiteHeartIcon.svg';
import ShareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function FoodInProgress({ match }) {
  const { id } = match.params;
  // const storageFood = JSON.parse(localStorage.getItem('inProgressRecipes'));
  // const foodId = Object.keys(storageFood.meals).find((item) => item === id);
  // const foodInProgress = storageFood.meals[foodId];
  const [meal, setMeal] = useState({});
  const [copied, setCopied] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const getData = async () => {
    const mealData = await fetchApi.fetchMealById(id);
    setMeal(mealData || {});
  };

  useEffect(() => {
    getData();
  }, []);

  const searchIngredients = (key) => (
    Object.keys(meal)
      .filter((keys) => keys.includes(key))
      .map((ingredients) => meal[ingredients])
  );

  const checkIngredients = (ingredient) => {
    const element = document.getElementById(`${ingredient}`);
    element.classList.toggle('line-through');
  };
  const mealIngredients = () => {
    const ingredients = searchIngredients('strIngredient');
    const measures = searchIngredients('strMeasure');
    return (
      <div>
        {ingredients.map((ingredient, index) => (
          ingredient !== '' && ingredient !== null && (
            <li
              key={ `${index}${ingredient}` }
              id={ ingredient }
              data-testid={ `${index}-ingredient-step` }
            >
              {`${ingredient} - ${measures[index]}`}
              <input type="checkbox" onClick={ () => checkIngredients(ingredient) } />
            </li>
          )
        ))}
      </div>
    );
  };

  const shareBtn = () => {
    copy(`http://localhost:3000/comidas/${id}`);
    setCopied(true);
  };

  const favorited = () => {
    const type = 'comida';
    const area = meal.strArea;
    const category = meal.strCategory;
    const alcoholicOrNot = '';
    const name = meal.strMeal;
    const image = meal.strMealThumb;
    const storageItem = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const favoriteRecipes = [
      ...storageItem, { id, type, area, category, alcoholicOrNot, name, image }];
    const favoriteFound = storageItem.some((item) => item.id === id);
    const unfavorite = storageItem.filter((item) => item.id !== id);
    if (favoriteFound) {
      setFavorite(false);
      localStorage.setItem('favoriteRecipes', JSON.stringify(unfavorite));
    }
    if (!favoriteFound) {
      setFavorite(true);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    }
  };

  const shareButton = () => (
    <button
      className="main-buttons"
      type="button"
      data-testid="share-btn"
      onClick={ shareBtn }
    >
      { copied ? 'Link copiado!'
        : <img src={ ShareIcon } alt="share" />}
    </button>
  );

  const favoriteButton = () => (
    <button
      className="main-buttons"
      type="button"
      data-testid="favorite-btn"
      onClick={ favorited }
      src={ favorite ? BlackHartIcon : WhiteHartIcon }
    >
      <img src={ favorite ? BlackHartIcon : WhiteHartIcon } alt="favorite" />
    </button>
  );

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ meal && meal.strMealThumb }
        alt="meal"
        className="recipe-photo"
      />
      <h2 data-testid="recipe-title">{meal.strMeal}</h2>
      {shareButton()}
      {favoriteButton()}
      <h3 data-testid="recipe-category">{meal.strCategory}</h3>
      <ul>{mealIngredients()}</ul>
      <p data-testid="instructions">{meal.strInstructions}</p>
      <Link to="/receitas-feitas">
        <button data-testid="finish-recipe-btn" type="button">Finalizar Receita</button>
      </Link>
    </div>
  );
}

FoodInProgress.propTypes = {
  match: PropTypes.objectOf(PropTypes.string),
}.isRequired;

export default FoodInProgress;
