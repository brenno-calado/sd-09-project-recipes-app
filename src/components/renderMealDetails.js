import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../App.css';

const RenderMealDetails = ({ recipe, id }) => {
  const [favorite, setFavorite] = useState(false);
  const [copied, setCopied] = useState(false);
  const { idMeal, strCategory,
    strMeal, strMealThumb, strArea } = recipe;

  const filterIngredients = () => {
    const recipeKeys = Object.keys(recipe);
    const recipeIngredientKeys = recipeKeys.filter((propriety) => (
      propriety.includes('strIngredient')));
    return recipeIngredientKeys.filter((ingredientKey) => (
      recipe[ingredientKey] !== '' && recipe[ingredientKey] !== null
    )).map((ingredintsKeys) => (
      recipe[ingredintsKeys]
    ));
  };

  const filterMeasures = () => {
    const measureKeys = Object.keys(recipe);
    const measureIngredientKeys = measureKeys.filter((propriety) => (
      propriety.includes('strMeasure')));
    return measureIngredientKeys.filter((measureKey) => (
      recipe[measureKey] !== '' && recipe[measureKey] !== null
    )).map((measureKey) => (
      recipe[measureKey]
    ));
  };

  const renderRecipeIngredients = () => {
    const ingredientsList = filterIngredients();
    const measureList = filterMeasures();
    return (
      <div>
        <h4>Lista de Ingredientes</h4>
        <ul>
          { ingredientsList.map((ingredient, index) => (
            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ ingredient }
            >
              { `${ingredient} (${measureList[index]})` }
            </li>
          ))}
        </ul>
      </div>

    );
  };

  const copyLink = (i) => {
    copy(`http://localhost:3000/comidas/${i}`);
    setCopied(true);
  };

  const renderShareButton = () => (
    <button
      type="button"
      onClick={ () => copyLink(idMeal) }
    >
      {copied ? <span>Link copiado!</span> : <img
        src={ shareIcon }
        data-testid="share-btn"
        alt="Share"
      /> }
    </button>
  );

  const setStorage = () => {
    const mealFavorite = {
      id: idMeal,
      type: 'comida',
      alcoholicOrNot: '',
      area: strArea,
      category: strCategory,
      name: strMeal,
      image: strMealThumb,
    };
    if (favorite) {
      const storage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      const itemStorage = storage.filter((item) => item.id !== idMeal);
      localStorage.setItem('favoriteRecipes', JSON.stringify(itemStorage));
    } else {
      const storage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      if (storage) {
        localStorage.setItem(
          'favoriteRecipes',
          JSON.stringify([...storage, mealFavorite]),
        );
      } else {
        localStorage.setItem('favoriteRecipes', JSON.stringify([mealFavorite]));
      }
    }
  };

  const verifyFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const fav = favorites.filter((item) => item.id === id);
    if (fav.length) {
      if (favorite) {
        setFavorite(false);
      } else {
        setFavorite(true);
      }
    }
  };

  useEffect(() => {
    verifyFavorite();
  }, []);

  const handleFavoriteButton = () => {
    if (favorite) {
      setFavorite(false);
    } else {
      setFavorite(true);
    }
    setStorage();
  };

  const renderFavoriteButton = () => (
    <button
      type="button"
      onClick={ handleFavoriteButton }
      className="action-button"
    >
      <img
        src={ (favorite) ? blackHeartIcon : whiteHeartIcon }
        alt="favorite"
        data-testid="favorite-btn"
        className="favorite-icon"
      />
    </button>
  );

  return (
    <div>
      <img
        style={ { width: 300, height: 300 } }
        src={ strMealThumb }
        data-testid="recipe-photo"
        alt="Foto do prato"
      />
      <h2
        data-testid="recipe-title"
      >
        { strMeal }
      </h2>
      <h5
        data-testid="recipe-category"
      >
        {strCategory}
      </h5>
      { renderShareButton() }
      { renderFavoriteButton() }
      { renderRecipeIngredients() }
    </div>
  );
};

RenderMealDetails.propTypes = {
  recipe: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  id: PropTypes.string.isRequired,
};

export default RenderMealDetails;
