import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import createIngredientsArray from '../services/createIngredientsArray';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import { localStorageInitialState } from '../services/localStorage';
import '../css/FoodsDetails.css';

const FoodsDetailsV2 = () => {
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
    const recipe = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((data) => data.json())
      .then((data) => data.meals[0]);
    setMyRecipe(recipe);
  };

  const fetchRecommendedDrinks = async () => {
    const MAX_RECOMMENDATIONS = 6;
    const myRecommendations = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((data) => data.json())
      .then((data) => data.drinks);
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
      setInProgress(Object.keys(myProgress.meals).includes(myId));
    }
  };

  const saveFavoriteToLocalStorage = () => {
    const { idMeal, strArea, strCategory, strMeal, strMealThumb } = myRecipe;
    const myFavorite = {
      id: idMeal,
      type: 'comida',
      area: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
    };

    const myStorageFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    // funcao pra saber se esta la
    if (checkInList(myStorageFavorite, idMeal)) {
      const newList = myStorageFavorite.filter((item) => item.id !== idMeal);
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
    history.push(`/comidas/${myId}/in-progress`);
  };

  useEffect(() => {
    localStorageInitialState();
  }, []);

  useEffect(() => {
    fetchSingleRecipeAPI(myId);
    fetchRecommendedDrinks();
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
  const { strMealThumb, strMeal, strCategory, strInstructions } = myRecipe;
  return (
    <div className="food-details-body">
      <img
        src={ strMealThumb }
        alt={ strMeal }
        className="food-details-image"
        data-testid="recipe-photo"
      />
      <div className="food-details-container">

        <div className="food-details-header">
          <p
            data-testid="recipe-title"
            className="food-details-name"
          >
            { strMeal }
          </p>
          <p
            data-testid="recipe-category"
            className="food-details-category"
          >
            { strCategory }
          </p>
          {shareButton ? <span>Link copiado!</span> : null}
        </div>

        <div className="food-details-button-container">
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

        <div className="food-details-ingredients-container">
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
            className="food-details-instructions"
          >
            { strInstructions }
          </p>
        </div>

        <div className="food-details-recomentadion-container">
          {recommended.map(({ strDrinkThumb, strDrink, strAlcoholic }, index) => (
            <div
              className="food-details-recommended-card"
              key={ strDrink }
              data-testid={ `${index}-recomendation-card` }
            >
              <img src={ strDrinkThumb } alt={ strDrink } />
              <p>{ strAlcoholic }</p>
              <p data-testid={ `${index}-recomendation-title` }>{ strDrink }</p>
            </div>
          ))}
        </div>

        <div className="food-details-video">
          <p data-testid="video">Colocar video aqui</p>
        </div>

        {done ? null : (
          <button
            type="button"
            className="food-details-start-button"
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

export default FoodsDetailsV2;
