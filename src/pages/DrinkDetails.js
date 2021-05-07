import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import RecomendedMeals from '../components/RecomendedMeals';
import '../App.css';

const DrinkDetails = ({ match: { params: { id } } }) => {
  const [recipe, setRecipe] = useState({});
  const [copied, setCopied] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [done, setDone] = useState(false);
  const { idDrink, strAlcoholic, strCategory, strDrink,
    strDrinkThumb, strInstructions } = recipe;

  const storageInProgress = (JSON
    .parse(localStorage.getItem('inProgressRecipes'))) || { cocktails: {} };
  const text = (storageInProgress.cocktails[id] !== undefined)
    ? 'Continuar Receita' : 'Iniciar Receita';

  const isDone = () => {
    const recipesFromStorage = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const recipeIsDone = recipesFromStorage.some((item) => item.id === id);
    if (recipeIsDone) {
      setDone(true);
    }
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const result = await response.json();
        setRecipe(result.drinks[0]);
      } catch (error) {
        return Error(error);
      }
    };
    fetchRecipe();
    isDone();
  }, [id]);

  const renderRecipePhoto = () => (
    <img
      style={ { width: 300, height: 300 } }
      src={ strDrinkThumb }
      data-testid="recipe-photo"
      alt="Foto do prato"
    />
  );

  const renderRecipeTitle = () => (
    <h2
      data-testid="recipe-title"
    >
      { strDrink }
    </h2>
  );

  const renderRecipeCategory = () => (
    <h5
      data-testid="recipe-category"
    >
      {strAlcoholic}
    </h5>
  );

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

  const renderRecipeInstructions = () => (
    <div>
      <h3>Modo de preparo:</h3>
      <p
        data-testid="instructions"
      >
        { strInstructions }
      </p>
    </div>
  );

  const renderStartRecipeButton = () => (
    <div>
      { !done && (
        <Link to={ `${idDrink}/in-progress` }>
          <button
            className="footer"
            type="button"
            data-testid="start-recipe-btn"
          >
            {text}
          </button>
        </Link>
      )}
    </div>
  );

  return (
    <div>
      { renderRecipePhoto() }
      { renderRecipeTitle() }
      { renderRecipeCategory() }
      { renderShareButton() }
      { renderFavoriteButton() }
      { renderRecipeIngredients() }
      { renderRecipeInstructions() }
      <RecomendedMeals />
      { renderStartRecipeButton() }
    </div>
  );
};

DrinkDetails.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
  id: PropTypes.string,
}.isRequired;

export default DrinkDetails;
