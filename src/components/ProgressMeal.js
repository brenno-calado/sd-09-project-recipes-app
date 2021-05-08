import React, { useContext } from 'react';
import { useLocation } from 'react-router';
import '../App.css';
import { MyContext } from '../MyContext';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import ShareButton from './ShareButton';

function ProgressMeal() {
  const {
    data,
    getKeysIngredints,
    isFavorite,
    saveFavorite,
    setIsFavorite,
    checkDoneMeals,
    localRecipes,
  } = useContext(MyContext);

  const { pathname } = useLocation();
  const recipeId = pathname.split('/')[2];

  const getFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (getFavorite !== null) {
    const initialFavoriteState = getFavorite.some((recipe) => recipe.id === recipeId);
    setIsFavorite(initialFavoriteState);
  }

  /*
   imagem: strMealThumb,
   titulo: strMeal,
   categoria: strCategory
  */

  const { ingredients, measures } = getKeysIngredints();

  const isDone = (currentIngredint) => {
    if (localRecipes) {
      const { meals } = localRecipes;
      if (meals[recipeId]) {
        return meals[recipeId].includes(currentIngredint);
      }
    }
  };

  const renderList = () => (
    ingredients.map((item, index) => (
      isDone(item) ? (
        <li
          key={ item }
          data-testid={ `${index}-ingredient-step` }
          className="list-group-item"
        >
          <input
            onClick={ ({ target }) => checkDoneMeals(recipeId, target, ingredients) }
            type="checkbox"
            className="mr-2"
            id={ index }
            checked
          />
          <label className="done" htmlFor={ index }>
            { `${item}: ${measures[index]}`}
          </label>
        </li>
      ) : (
        <li
          key={ item }
          data-testid={ `${index}-ingredient-step` }
          className="list-group-item"
        >
          <input
            onClick={ ({ target }) => checkDoneMeals(recipeId, target, ingredients) }
            type="checkbox"
            className="mr-2"
            id={ index }
          />
          <label htmlFor={ index }>
            { `${item}: ${measures[index]}`}
          </label>
        </li>
      )
    ))
  );

  return (
    <div className="container">
      <img
        src={ data.strMealThumb }
        alt={ data.strMeal }
        data-testid="recipe-photo"
        className="img-thumbnail img-fluid"
      />
      <div className="d-flex">
        <h1 data-testid="recipe-title">{ data.strMeal }</h1>
        <ShareButton />
        <button
          type="button"
          className="btn"
          onClick={ () => saveFavorite(recipeId, pathname) }
        >
          <img
            src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            alt="favorite"
            data-testid="favorite-btn"
          />
        </button>
      </div>
      <h2 data-testid="recipe-category">{ data.strCategory }</h2>
      <ul className="list-unstyled my-2 list-group">
        { renderList() }
      </ul>
      <p className="text-justify" data-testid="instructions">{ data.strInstructions }</p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        className="btn btn-success btn-lg"
      >
        Finalizar receita
      </button>
    </div>
  );
}

export default ProgressMeal;