import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function copyToClipboard(history, setCopyLink) {
  const twelve = 12;
  navigator.clipboard.writeText(`http://localhost:3000${history.location.pathname.slice(0, -twelve)}`);
  setCopyLink(true);
}

function btnShare(history, setCopyLink) {
  return (
    <button
      data-testid="share-btn"
      type="button"
      onClick={ () => copyToClipboard(history, setCopyLink) }
    >
      <img src={ shareIcon } alt="Compartilhar" />
    </button>
  );
}

function renderInstructions(instructions) {
  return (
    <>
      <h3>Instructions</h3>
      <p data-testid="instructions">{instructions}</p>
    </>
  );
}

function btnFinished(history, disableBtnFinished) {
  return (
    <button
      data-testid="finish-recipe-btn"
      type="button"
      disabled={ disableBtnFinished }
      onClick={ () => { history.push('/receitas-feitas'); } }
    >
      Finished
    </button>
  );
}

function filterIngredients(obj, setIngredient) {
  const recipe = Object.entries(obj);
  const ingredientsKeyValue = recipe
    .filter((item) => ((item[0].includes('strIngredient')) && item[1]));
  setIngredient(ingredientsKeyValue.map((item) => (item[1])));
}

function RecipeInProgress() {
  const one = 1;
  const history = useHistory();
  const [favorite, setFavorite] = useState(false);

  const [itemsChecked, setItemsChecked] = useState([]);
  const [disableBtnFinished, setDisableBtnFinished] = useState(true);
  const [ingredients, setIngredient] = useState([]);
  const [instructions, setInstructions] = useState('');
  const [details, setDetails] = useState({});
  const [copyLink, setCopyLink] = useState(false);
  const id = history.location.pathname.replace(/\D/g, '');
  const type = history.location.pathname.split('/')[1];

  useEffect(() => {
    if (itemsChecked && ingredients.length === itemsChecked.length) {
      setDisableBtnFinished(false);
    } else {
      setDisableBtnFinished(true);
    }
  }, [ingredients, itemsChecked]);

  useEffect(() => {
    const objItems = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (objItems) {
      const arrayItems = Object.values(Object.entries(objItems)[1][1])[0];
      setItemsChecked(arrayItems);
    }
    const favoriteItems = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setFavorite(favoriteItems.some((item) => item.id === id));
  }, [id]);

  useEffect(() => {
    if (type === 'comidas') {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json())
        .then(({ meals }) => {
          filterIngredients(meals[0], setIngredient);
          setInstructions(meals[0].strInstructions);
          setDetails({
            id,
            type: 'comida',
            area: meals[0].strArea,
            category: meals[0].strCategory,
            alcoholicOrNot: '',
            name: meals[0].strMeal,
            image: meals[0].strMealThumb,
          });
        });
    } else {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json())
        .then(({ drinks }) => {
          filterIngredients(drinks[0], setIngredient);
          setInstructions(drinks[0].strInstructions);
          setDetails({
            id,
            type: 'bebida',
            area: '',
            category: drinks[0].strCategory,
            alcoholicOrNot: drinks[0].strAlcoholic,
            name: drinks[0].strDrink,
            image: drinks[0].strDrinkThumb,
          });
        });
    }
  }, [id, type]);

  function handleClick() {
    setFavorite(!favorite);
    let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (!favorite) {
      favoriteRecipes = [...favoriteRecipes, details];
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    } else {
      favoriteRecipes = favoriteRecipes.filter((item) => item.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    }
  }

  function btnFavorite() {
    return (
      <button
        type="button"
        onClick={ handleClick }
      >
        <img
          data-testid="favorite-btn"
          src={ favorite ? blackHeartIcon : whiteHeartIcon }
          alt="Favoritar"
        />
      </button>
    );
  }

  function saveToLocalStore(arrayItems) {
    let localItems = JSON.parse(localStorage.getItem('inProgressRecipes'))
    || { meals: {}, cocktails: {} };
    if (type === 'comida') {
      localItems = {
        ...localItems,
        meals: {
          ...localItems.meals,
          [id]: arrayItems },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(localItems));
      return;
    }
    localItems = {
      ...localItems,
      cocktails: {
        ...localItems.cocktails,
        [id]: arrayItems },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(localItems));
  }

  function isChecked(target) {
    setItemsChecked([...itemsChecked, target.value]);
    saveToLocalStore([...itemsChecked, target.value]);
  }

  function disChecked(target) {
    if (itemsChecked && itemsChecked.indexOf(target.value) !== -one) {
      setItemsChecked(itemsChecked.filter((item) => item !== target.value));
      saveToLocalStore(itemsChecked.filter((item) => item !== target.value));
    }
  }

  function handleCheck({ target }) {
    if (target.checked && itemsChecked && itemsChecked.indexOf(target.value) === -one) {
      isChecked(target);
      return;
    }
    disChecked(target);
  }

  function renderIngredients() {
    if (ingredients.length <= 0) return <h1>{ingredients}</h1>;
    return (
      <>
        <h3>Ingredients</h3>
        { ingredients.map((ingredient, index) => (
          <label
            key={ ingredient }
            htmlFor={ ingredient }
            data-testid={ `${index}-ingredient-step` }
            style={ { display: 'block' } }
          >
            <input
              id={ ingredient }
              type="checkbox"
              onChange={ handleCheck }
              value={ ingredient }
              checked={ itemsChecked && itemsChecked.indexOf(ingredient) !== -one }
            />
            { ingredient }
          </label>
        )) }
      </>
    );
  }

  return (
    <div>
      <img data-testid="recipe-photo" src={ details.image } alt="Imagem da receita" />
      <h2 data-testid="recipe-title">{details.title}</h2>
      <p data-testid="recipe-category">{details.category}</p>
      { btnShare(history, setCopyLink) }
      { copyLink && <p>Link copiado!</p>}
      { btnFavorite() }
      { renderIngredients() }
      { renderInstructions(instructions) }
      { btnFinished(history, disableBtnFinished) }
    </div>
  );
}

export default RecipeInProgress;
