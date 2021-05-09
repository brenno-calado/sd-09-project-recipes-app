import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import createIngredientsArray from '../services/createIngredientsArray';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import { localStorageInitialState,
  sendDoneRecipeToLocalStorage } from '../services/localStorage';
import '../css/FoodsInProgress.css';

const FoodsInProgress = () => {
  const [loading, setLoading] = useState(true);
  const [myRecipe, setMyRecipe] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [checked, setChecked] = useState([]);
  const [enableButton, setEnableButton] = useState(false);
  const [shareButton, setShareButton] = useState(false);
  const [favorited, setFavorited] = useState(false);

  // importa o History para usar o ID
  const history = useHistory();
  const { location: { pathname } } = history;
  const myId = pathname.split('/')[2];

  const fetchSingleRecipeAPI = async (id) => {
    const recipe = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((data) => data.json())
      .then((data) => data.meals[0]);
    setMyRecipe(recipe);
  };

  // salva o progresso da receita no localStorage
  const saveToLocalStorage = (array) => {
    const myStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    myStorage.meals[myId] = array;
    localStorage.setItem('inProgressRecipes', JSON.stringify(myStorage));
  };

  const localStorageToChecked = (recipeId) => {
    const myChecked = (JSON.parse(localStorage.getItem('inProgressRecipes')))
      .meals[recipeId];
    if (myChecked) setChecked(myChecked);
  };

  const checkFavorite = (favoriteList, id) => favoriteList.some((item) => item.id === id);

  const checkFavoriteButton = () => {
    const myStorageFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const { idMeal } = myRecipe;
    setFavorited(checkFavorite(myStorageFavorite, idMeal));
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
    if (checkFavorite(myStorageFavorite, idMeal)) {
      const newList = myStorageFavorite.filter((item) => item.id !== idMeal);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newList));
    } else {
      myStorageFavorite.push(myFavorite);
      localStorage.setItem('favoriteRecipes', JSON.stringify(myStorageFavorite));
    }
  };

  const checkDefaultChecked = (ingredient) => (checked.includes(ingredient));

  // remove a receita finalizada do localStorage
  const deleteFinishedRecipe = (id) => {
    const myStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    delete myStorage.meals[id];
    localStorage.setItem('inProgressRecipes', JSON.stringify(myStorage));
  };

  const handleFinishClick = () => {
    const { idMeal } = myRecipe;
    deleteFinishedRecipe(idMeal);
    sendDoneRecipeToLocalStorage('comida', myRecipe);
  };

  // checa se pode habilitar o botao FinalizarReceita
  const checkDisableButton = () => {
    setEnableButton(checked.length === ingredients.length);
  };

  // manipula o array de ingredientes checados
  const handleChecked = ({ target }) => {
    const { value } = target;
    let checkedArray = checked;
    if (checkedArray.includes(value)) {
      checkedArray = checkedArray.filter((ingredient) => ingredient !== value);
    } else {
      checkedArray.push(value);
    }
    setChecked(checkedArray);
    saveToLocalStorage(checkedArray);
    checkDisableButton();
  };

  const clickShare = () => {
    setShareButton(true);
    const myPath = (window.location.href).replace(/\/in-progress/, '');
    navigator.clipboard.writeText(myPath);
  };

  const clickFavorite = () => {
    setFavorited(!favorited);
    saveFavoriteToLocalStorage();
  };

  useEffect(() => {
    localStorageInitialState();
  }, []);

  useEffect(() => {
    fetchSingleRecipeAPI(myId);
    localStorageToChecked(myId);
    setLoading(false);
  }, [myId]);

  useEffect(() => {
    checkFavoriteButton();
    checkDisableButton();
  });

  useEffect(() => {
    setIngredients(createIngredientsArray(myRecipe));
  }, [myRecipe]);

  if (loading) return (<p>Loading...</p>);
  const { strMeal, strMealThumb, strCategory, strInstructions } = myRecipe;
  return (
    <div className="food-in-progress-body">
      <img
        src={ strMealThumb }
        alt={ strMeal }
        className="food-in-progress-image"
        data-testid="recipe-photo"
      />
      <div className="food-in-progress-container">
        <div className="food-in-progress-header">
          <p className="food-in-progress-name" data-testid="recipe-title">{strMeal}</p>
          <p
            className="food-in-progress-category"
            data-testid="recipe-category"
          >
            {strCategory}
          </p>
          {shareButton ? <span>Link copiado!</span> : null}
        </div>
        <div className="food-in-progress-button-container">
          <button
            type="button"
            data-testid="share-btn"
            onClick={ clickShare }
          >
            <img src={ shareIcon } alt="share" />
          </button>

          <button
            type="button"
            onClick={ clickFavorite }
          >
            <img
              data-testid="favorite-btn"
              src={ favorited ? blackHeartIcon : whiteHeartIcon }
              alt="favorite"
            />
          </button>
        </div>

        <div className="food-in-progress-ingredient-container">
          { ingredients.map(({ ingredient, amount }, index) => (
            <div
              key={ ingredient }
              data-testid={ `${index}-ingredient-step` }
              className="food-in-progress-ingredient-step-container"
            >
              <input
                type="checkbox"
                name={ ingredient }
                value={ ingredient }
                id={ ingredient }
                onClick={ handleChecked }
                defaultChecked={ checkDefaultChecked(ingredient) }
              />
              <label htmlFor={ ingredient }>
                { `${ingredient} - ${amount}` }
              </label>
            </div>
          )) }
        </div>
        <div className="food-in-progress-instructions">
          <p
            data-testid="instructions"
          >
            {strInstructions}
          </p>
        </div>
        <Link to="/receitas-feitas" className="food-in-progress-finaliza-btn">
          <button
            type="button"
            data-testid="finish-recipe-btn"
            disabled={ !enableButton }
            onClick={ handleFinishClick }
          >
            Finalizar Receita
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FoodsInProgress;
