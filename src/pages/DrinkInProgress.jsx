import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import fetchApi from '../services/index';
import BlackHartIcon from '../images/blackHeartIcon.svg';
import WhiteHartIcon from '../images/whiteHeartIcon.svg';
import ShareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function DrinkInProgress({ match }) {
  const { id } = match.params;
  const [drink, setDrink] = useState({});
  const [copied, setCopied] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const getData = async () => {
    const drinkData = await fetchApi.fetchDrinkById(id);
    setDrink(drinkData);
  };

  useEffect(() => {
    getData();
  }, []);

  const searchIngredients = (key) => (
    Object.keys(drink)
      .filter((keys) => keys.includes(key))
      .map((ingredients) => drink[ingredients])
  );

  const checkIngredients = (ingredient) => {
    const element = document.getElementById(`${ingredient}`);
    element.classList.toggle('line-through');
  };
  const drinkIngredients = () => {
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
    copy(`http://localhost:3000/bebidas/${id}`);
    setCopied(true);
  };

  const favorited = () => {
    const type = 'bebida';
    const area = '';
    const category = drink.strCategory;
    const alcoholicOrNot = drink.strAlcoholic;
    const name = drink.strDrink;
    const image = drink.strDrinkThumb;
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
        src={ drink.strDrinkThumb }
        alt="drink"
        className="recipe-photo"
      />
      <h2 data-testid="recipe-title">{drink.strDrink}</h2>
      {shareButton()}
      {favoriteButton()}
      <h3 data-testid="recipe-category">{drink.strCategory}</h3>
      <ul>{drinkIngredients()}</ul>
      <p data-testid="instructions">{drink.strInstructions}</p>
      <Link to="/receitas-feitas">
        <button data-testid="finish-recipe-btn" type="button">Finalizar Receita</button>
      </Link>
    </div>
  );
}
DrinkInProgress.propTypes = {
  match: PropTypes.objectOf(PropTypes.string),
}.isRequired;

export default DrinkInProgress;
