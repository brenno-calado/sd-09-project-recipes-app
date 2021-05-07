import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../App.css';

const RenderDrinkDetails = ({ recipe, id }) => {
  const [favorite, setFavorite] = useState(false);
  const [copied, setCopied] = useState(false);
  const { idDrink, strAlcoholic, strCategory,
    strDrink, strDrinkThumb } = recipe;

  const filterIngredients = () => {
    const recipeKeys = Object.keys(recipe);
    const recipeIngredientKeys = recipeKeys.filter((propriety) => (
      propriety.includes('strIngredient')));
    return recipeIngredientKeys.filter((ingredientKey) => (
      recipe[ingredientKey] !== null && recipe[ingredientKey] !== ''
    )).map((ingredintsKeys) => (
      recipe[ingredintsKeys]
    ));
  };

  const filterMeasures = () => {
    const measureKeys = Object.keys(recipe);
    const measureIngredientKeys = measureKeys.filter((propriety) => (
      propriety.includes('strMeasure')));
    return measureIngredientKeys.filter((measureKey) => (
      recipe[measureKey] !== null && recipe[measureKey] !== ''
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
              { `${ingredient} (${measureList[index] ? measureList[index] : ''})` }
            </li>
          ))}
        </ul>
      </div>

    );
  };

  const copyLink = (i) => {
    copy(`http://localhost:3000/bebidas/${i}`);
    setCopied(true);
  };

  const renderShareButton = () => (
    <button
      type="button"
      onClick={ () => copyLink(recipe.idDrink) }
    >
      {copied ? <span>Link copiado!</span> : <img
        src={ shareIcon }
        data-testid="share-btn"
        alt="Share"
      /> }
    </button>
  );

  const setStorage = () => {
    const drinkFavorite = { id: idDrink,
      type: 'bebida',
      alcoholicOrNot: strAlcoholic,
      area: '',
      category: strCategory,
      name: strDrink,
      image: strDrinkThumb,
    };
    if (favorite) {
      const storage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      const itemStorage = storage.filter((item) => item.id !== idDrink);
      localStorage.setItem('favoriteRecipes', JSON.stringify(itemStorage));
    } else {
      const storage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      if (storage) {
        localStorage.setItem(
          'favoriteRecipes',
          JSON.stringify([...storage, drinkFavorite]),
        );
      } else {
        localStorage.setItem('favoriteRecipes', JSON.stringify([drinkFavorite]));
      }
    }
  };

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
    >
      <img
        src={ (favorite) ? blackHeartIcon : whiteHeartIcon }
        alt="favorite"
        data-testid="favorite-btn"
        className="favorite-icon"
      />
    </button>
  );

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

  return (
    <div>
      <img
        style={ { width: 300, height: 300 } }
        src={ strDrinkThumb }
        data-testid="recipe-photo"
        alt="Foto da bebida"
      />
      <h2
        data-testid="recipe-title"
      >
        { strDrink }
      </h2>
      <h5
        data-testid="recipe-category"
      >
        {strAlcoholic}
      </h5>
      { renderShareButton() }
      { renderFavoriteButton() }
      { renderRecipeIngredients() }
    </div>
  );
};

RenderDrinkDetails.propTypes = {
  recipe: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  id: PropTypes.string.isRequired,
};

export default RenderDrinkDetails;
