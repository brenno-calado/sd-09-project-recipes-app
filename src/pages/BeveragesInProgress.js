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
import '../css/BeveragesInProgress.css';

const BeveragesInProgress = () => {
  // aqui ficam os states
  const [loading, setLoading] = useState(true);
  const [myRecipe, setMyRecipe] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [checked, setChecked] = useState([]);
  const [enableButton, setEnableButton] = useState(false);
  const [shareButton, setShareButton] = useState(false);
  const [favorited, setFavorited] = useState(false);

  // aqui as auxiliares
  const history = useHistory();
  const { location: { pathname } } = history;
  const myId = pathname.split('/')[2];

  // funcoes
  const fetchSingleRecipeAPI = async (id) => {
    const recipe = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((data) => data.json())
      .then((data) => data.drinks[0]);
    setMyRecipe(recipe);
  };

  const saveToLocalStorage = (array) => {
    const myStorage = JSON.parse(localStorage.getItem('inProgress'));
    myStorage.cocktails[myId] = array;
    localStorage.setItem('inProgress', JSON.stringify(myStorage));
  };

  const localStorageToChecked = (recipeId) => {
    const myChecked = (JSON.parse(localStorage.getItem('inProgress')))
      .cocktails[recipeId];
    if (myChecked) setChecked(myChecked);
  };

  const checkFavorite = (favoriteList, id) => favoriteList.some((item) => item.id === id);

  const checkFavoriteButton = () => {
    const myStorageFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const { idDrink } = myRecipe;
    setFavorited(checkFavorite(myStorageFavorite, idDrink));
  };

  //
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
      // doneDate: dateFormatting(),
      // tags: strTags ? strTags.split(',') : [],
    };
    const myStorageFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    // funcao pra saber se esta la
    if (checkFavorite(myStorageFavorite, idDrink)) {
      const newList = myStorageFavorite.filter((item) => item.id !== idDrink);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newList));
    } else {
      myStorageFavorite.push(myFavorite);
      localStorage.setItem('favoriteRecipes', JSON.stringify(myStorageFavorite));
    }
  };

  const checkDefaultChecked = (ingredient) => (checked.includes(ingredient));

  const deleteFinishedRecipe = () => {
    const myStorage = JSON.parse(localStorage.getItem('inProgress'));
    delete myStorage.cocktails[myId];
    localStorage.setItem('inProgress', JSON.stringify(myStorage));
  };

  const checkDisableButton = () => {
    setEnableButton(checked.length === ingredients.length);
  };

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

  // use Effects
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

  // return
  if (loading) return (<p>Loading...</p>);
  const { strDrink, strDrinkThumb, strCategory, strInstructions } = myRecipe;
  return (
    <div style={ containerStyle }>
      <h1 data-testid="recipe-title">{strDrink}</h1>
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
        src={ strDrinkThumb }
        alt={ strDrink }
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

export default BeveragesInProgress;
