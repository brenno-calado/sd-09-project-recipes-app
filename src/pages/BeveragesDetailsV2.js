import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import createIngredientsArray from '../services/createIngredientsArray';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import { localStorageInitialState } from '../services/localStorage';
import '../css/BeverageDetails.css';

const BeveragesDetailsV2 = () => {
  const [loading, setLoading] = useState(true);
  const [myRecipe, setMyRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [favorited, setFavorited] = useState('');
  const [done, setDone] = useState('');
  const [inProgress, setInProgress] = useState('');
  const [shareButton, setShareButton] = useState(false);
  const [recommended, setRecommended] = useState([]);

  const history = useHistory();
  const { location: { pathname } } = history;
  const myId = pathname.split('/')[2];

  const fetchSingleRecipeAPI = async (id) => {
    const recipe = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((data) => data.json())
      .then((data) => data.drinks[0]);
    setMyRecipe(recipe);
  };

  const fetchRecommendedFoods = async () => {
    const MAX_RECOMMENDATIONS = 6;
    const myRecommendations = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((data) => data.json())
      .then((data) => data.meals);
    setRecommended(myRecommendations.slice(0, MAX_RECOMMENDATIONS));
  };

  // dado um array, checa se o id está la ou não
  const checkInList = (myList, id) => myList.some((item) => item.id === id);

  const checkFavoriteButton = () => {
    const myStorageFavorite = (JSON.parse(localStorage.getItem('favoriteRecipes'))
      ? JSON.parse(localStorage.getItem('favoriteRecipes')) : []);
    setFavorited(checkInList(myStorageFavorite, myId));
  };

  const checkDoneButton = () => {
    const myDoneList = (JSON.parse(localStorage.getItem('doneRecipes'))
      ? JSON.parse(localStorage.getItem('doneRecipes')) : []);
    setDone(checkInList(myDoneList, myId));
  };

  const checkInProgress = () => {
    const myProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (myProgress) {
      setInProgress(Object.keys(myProgress.cocktails).includes(myId));
    }
  };

  const saveFavoriteToLocalStorage = () => {
    const {
      idDrink,
      strCategory,
      strAlcoholic,
      strDrink,
      strDrinkThumb } = myRecipe;
    const myFavorite = {
      id: idDrink,
      type: 'bebida',
      area: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
    };
    const myStorageFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    // funcao pra saber se esta la
    if (checkInList(myStorageFavorite, idDrink)) {
      const newList = myStorageFavorite.filter((item) => item.id !== idDrink);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newList));
    } else {
      myStorageFavorite.push(myFavorite);
      localStorage.setItem('favoriteRecipes', JSON.stringify(myStorageFavorite));
    }
  };

  const clickFavorite = () => {
    setFavorited(!favorited);
    saveFavoriteToLocalStorage();
  };

  const clickShare = () => {
    setShareButton(true);
    const myPath = window.location.href;
    navigator.clipboard.writeText(myPath);
  };

  const clickStartButton = () => {
    history.push(`/bebidas/${myId}/in-progress`);
  };

  useEffect(() => {
    localStorageInitialState();
    fetchRecommendedFoods();
  }, []);

  useEffect(() => {
    fetchSingleRecipeAPI(myId);
    setLoading(false);
  }, [myId]);

  useEffect(() => {
    setIngredients(createIngredientsArray(myRecipe));
  }, [myRecipe]);

  useEffect(() => {
    checkFavoriteButton();
    checkDoneButton();
    checkInProgress();
  });
  if (loading) return (<p>Loading...</p>);
  const { strDrinkThumb, strDrink, strAlcoholic, strInstructions } = myRecipe;
  return (
    <div className="drink-details-body">
      <img
        src={ strDrinkThumb }
        alt={ strDrink }
        className="drink-details-image"
        data-testid="recipe-photo"
      />

      <div className="drink-details-container">

        <div className="drink-details-header">
          <p
            data-testid="recipe-title"
            className="drink-details-name"
          >
            { strDrink }
          </p>
          <p
            data-testid="recipe-category"
            className="drink-details-category"
          >
            { strAlcoholic }
          </p>
          {shareButton ? <span>Link copiado!</span> : null}
        </div>

        <div className="drink-details-button-container">
          <button
            type="button"
            data-testid="share-btn"
            onClick={ clickShare }
          >
            <img src={ shareIcon } alt="share-button" />
          </button>
          <button
            type="button"
            onClick={ clickFavorite }
          >
            <img
              src={ favorited
                ? blackHeartIcon
                : whiteHeartIcon }
              alt="favorite-button"
              data-testid="favorite-btn"
            />
          </button>
        </div>

        <div className="drink-details-ingredients-container">
          { ingredients.map(({ ingredient, amount }, index) => (
            <p
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {`${ingredient} - ${amount}`}
            </p>
          ))}
        </div>

        <div>
          <p
            data-testid="instructions"
            className="drink-details-instructions"
          >
            { strInstructions }
          </p>
        </div>

        <div className="drink-details-recomentadion-container">
          {recommended.map(({ strMealThumb, strMeal, strCategory }, index) => (
            <div
              className="drink-details-recommended-card"
              key={ strMeal }
              data-testid={ `${index}-recomendation-card` }
            >
              <img src={ strMealThumb } alt={ strMeal } />
              <p>{ strCategory }</p>
              <p data-testid={ `${index}-recomendation-title` }>{ strMeal }</p>
            </div>
          ))}
        </div>

        {done ? null : (
          <button
            type="button"
            className="drink-details-start-button"
            data-testid="start-recipe-btn"
            onClick={ clickStartButton }
          >
            { inProgress ? 'Continuar Receita' : 'Iniciar Receita' }
          </button>
        )}

      </div>
    </div>
  );
};

export default BeveragesDetailsV2;
