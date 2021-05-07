import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  fetchMealsById,
  fetchDrinkById,
  setFavoritesStorage,
  setRecipesStatusStorage } from '../services/index';
import { saveMealAsFavorite, saveDrinkAsFavorite } from '../services/recipes';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import IngredientsList from '../components/IngredientsList';

function RecipeInProgress() {
  const [recipeInProgress, setRecipeInProgress] = useState({});
  const [isFavorite, setFavorite] = useState(false);
  const [isFetching, setFetching] = useState(true);
  const [urlCopied, setUrlCopied] = useState('');
  const [typeOfFood, setTypeOfFood] = useState('');
  // const [recipeCompleted, setRecipeCompleted] = useState(false);
  // const [ingredientsList, setIngredients] = useState([]);
  const recipeId = useParams();
  const reference = window.location.href;
  // const fetchStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));

  useEffect(() => {
    const setRecipe = async () => {
      if (reference.includes('comidas')) {
        const retrievedRecipe = await fetchMealsById(recipeId.id);
        setRecipeInProgress(retrievedRecipe[0]);
        setTypeOfFood('meals');
        setFetching(false);
      }
      if (reference.includes('bebidas')) {
        const retrievedRecipe = await fetchDrinkById(recipeId.id);
        setRecipeInProgress(retrievedRecipe[0]);
        setTypeOfFood('cocktails');
        setFetching(false);
      }
    };
    const checkFavorites = (id) => {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (favoriteRecipes.some((recipe) => recipe.id === id)) setFavorite(true);
    };
    setFavoritesStorage();
    setRecipesStatusStorage();
    checkFavorites(recipeId.id);
    setRecipe();
  }, [recipeId.id, reference]);

  const saveAsFavorite = () => {
    setFavorite(!isFavorite);
    return typeOfFood === 'meals'
      ? saveMealAsFavorite(recipeId.id, recipeInProgress)
      : saveDrinkAsFavorite(recipeId.id, recipeInProgress);
  };

  const onCopyText = () => {
    const timeout = 1000;
    setUrlCopied('Link copiado!');
    setTimeout(() => {
      setUrlCopied('');
    }, timeout);
  };

  const copyToClipBoard = async () => {
    onCopyText();
    if (typeOfFood === 'meals') {
      await navigator.clipboard
        .writeText(`http://localhost:3000/comidas/${recipeId.id}`);
    } else {
      await navigator.clipboard
        .writeText(`http://localhost:3000/bebidas/${recipeId.id}`);
    }
  };

  // const checkStatus = () => {
  //   const checkBoxes = [];
  //   const allIngredients = document.querySelectorAll('input');
  //   // console.log(allIngredients.every((item) => item.checked));
  //   // if (allIngredients.some((item) => item.checked === false)) return setRecipeCompleted(false);
  //   // return setRecipeCompleted(true);
  //   allIngredients.forEach((item) => checkBoxes.push(item.checked));
  //   return setRecipeCompleted(checkBoxes.every((item) => item === true));
  //   // return setRecipeCompleted(allIngredients.every((item) => item.checked === true));
  // };

  // const updateStorage = (event) => {
  //   // checkStatus();
  //   const { target } = event;
  //   const storageType = fetchStorage[typeOfFood];
  //   const localRecipe = storageType[recipeId.id];
  //   if (localRecipe.some((item) => target.value === item)) {
  //     const newStorageItem = localRecipe.filter((item) => item !== target.value);
  //     const newStorage = {
  //       ...fetchStorage,
  //       [typeOfFood]: {
  //         ...fetchStorage[typeOfFood],
  //         [recipeId.id]: newStorageItem,
  //       },
  //     };
  //     return localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
  //   }
  //   if (!localRecipe.includes(target.value)) {
  //     const newStorage = {
  //       ...fetchStorage,
  //       [typeOfFood]: {
  //         ...fetchStorage[typeOfFood],
  //         [recipeId.id]: fetchStorage[typeOfFood][recipeId.id].concat(target.value),
  //       },
  //     };
  //     return localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
  //   }
  // };

  // const renderIngredientsList = () => {
  //   const ingredients = filterIngredients(recipeInProgress);
  //   // setIngredients(ingredients);
  //   return (
  //     <div className="ingredients-checkbox">
  //       {ingredients.map((item, index) => (
  //         <label
  //           htmlFor={ item }
  //           key={ index }
  //           data-testid={ `${index}-ingredient-step` }
  //           // className="null"
  //           id={ item }
  //         >
  //           <input
  //             id={ item }
  //             type="checkbox"
  //             value={ item }
  //             name={ item }
  //             onClick={ (e) => updateStorage(e) }
  //           />
  //           { item }
  //         </label>
  //       ))}
  //     </div>);
  // };

  // const renderDoneButton = () => (
  //   <Link to="/receitas-feitas">
  //     <button
  //       data-testid="finish-recipe-btn"
  //       className="done-recipe"
  //       type="button"
  //       onClick={ () => console.log('Done button') }
  //       disabled={ !recipeCompleted }
  //     >
  //       Finalizar receita
  //     </button>

  //   </Link>
  // );

  const renderInProgress = (recipe) => (
    <div className="recipe-details">
      <img
        className="recipe-image"
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        alt="Receita"
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{ recipe.strMeal || recipe.strDrink }</h1>
      <div id="shareAndFavorite">
        <button
          type="button"
          data-testid="share-btn"
          onClick={ () => copyToClipBoard() }
        >
          <img src={ shareIcon } alt="compartilhar" />
        </button>
        <button
          type="button"
          onClick={ () => saveAsFavorite() }
        >
          <img
            data-testid="favorite-btn"
            src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            alt="Favorite"
          />
        </button>
        <span>{ urlCopied }</span>
      </div>
      <h2
        data-testid="recipe-category"
      >
        {`Categoria: ${recipe.strAlcoholic || recipe.strCategory}`}
      </h2>
      {/* <ul>
        { renderIngredientsList() }
      </ul> */}
      <IngredientsList id={ recipeId.id } type={ typeOfFood } />
      <p data-testid="instructions">{ recipe.strInstructions }</p>
      {/* { renderDoneButton() } */}
    </div>
  );

  return (
    !isFetching && renderInProgress(recipeInProgress)
  );
}

export default RecipeInProgress;
