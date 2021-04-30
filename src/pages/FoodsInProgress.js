import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import createIngredientsArray from '../services/createIngredientsArray';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
// import dateFormatting from '../services/dateFormatting';
import { localStorageInitialState,
  favoritesLocalStorageInitialState }
  from '../services/localStorage';
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
    const myStorage = JSON.parse(localStorage.getItem('inProgress'));
    myStorage.meals[myId] = array;
    localStorage.setItem('inProgress', JSON.stringify(myStorage));
  };

  const localStorageToChecked = (recipeId) => {
    const myChecked = (JSON.parse(localStorage.getItem('inProgress'))).meals[recipeId];
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
      // doneDate: dateFormatting(),
      // tags: strTags ? strTags.split(',') : [],
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
  const deleteFinishedRecipe = () => {
    const myStorage = JSON.parse(localStorage.getItem('inProgress'));
    delete myStorage.meals[myId];
    localStorage.setItem('inProgress', JSON.stringify(myStorage));
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

  // CSS pra fazer depois
  const imgStyle = {
    maxWidth: '200x',
    maxHeight: '200px',
    margin: 'auto',
    borderRadius: '50px',
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'scroll',
  };

  const buttonContainer = {
    display: 'flex',
    flexDirection: 'row',
    margin: 'auto',
  };
  // fim do css

  useEffect(() => {
    localStorageInitialState();
    favoritesLocalStorageInitialState();
  }, []);

  useEffect(() => {
    fetchSingleRecipeAPI(myId);
    localStorageToChecked(myId);
    setLoading(false);
  }, [myId]);

  useEffect(() => {
    checkFavoriteButton();
  });

  useEffect(() => {
    setIngredients(createIngredientsArray(myRecipe));
  }, [myRecipe]);

  useEffect(() => {
    checkDisableButton();
  });

  if (loading) return (<p>Loading...</p>);
  const { strMeal, strMealThumb, strCategory, strInstructions } = myRecipe;
  // console.log(JSON.parse(localStorage.getItem('inProgressRecipes')));
  return (
    <div style={ containerStyle }>
      <h1 data-testid="recipe-title">{strMeal}</h1>
      <h4 data-testid="recipe-category">{strCategory}</h4>

      <div style={ buttonContainer }>
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
      {shareButton ? <span>Link copiado!</span> : null}
      <img
        src={ strMealThumb }
        alt={ strMeal }
        style={ imgStyle }
        data-testid="recipe-photo"
      />
      <div>
        { ingredients.map(({ ingredient, amount }, index) => (
          <div
            key={ ingredient }
            data-testid={ `${index}-ingredient-step` }
            className="ingredient-step-container"
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
      <div>
        <p
          data-testid="instructions"
        >
          {strInstructions}
        </p>
      </div>
      <Link to="/receitas-feitas">
        <button
          type="button"
          data-testid="finish-recipe-btn"
          disabled={ !enableButton }
          onClick={ deleteFinishedRecipe }
        >
          Finalizar Receita
        </button>
      </Link>
    </div>
  );
};

export default FoodsInProgress;
