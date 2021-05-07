import React, { useContext } from 'react';
import { useLocation } from 'react-router';
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
    checkDone,
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

  //  const inProgressRecipes = {
  //   cocktails: {
  //       id-da-bebida: [lista-de-ingredientes-utilizados],
  //       ...
  //   },
  //   meals: {
  //       id-da-comida: [lista-de-ingredientes-utilizados],
  //       ...
  //   }
  // }

  const { ingredients, measures } = getKeysIngredints();

  const renderList = () => (
    ingredients.map((item, index) => (
      <li
        key={ item }
        data-testid={ `${index}-ingredient-step` }
        className="list-group-item"
      >
        <input
          onClick={ ({ target }) => checkDone(recipeId, target, ingredients) }
          type="checkbox"
          className="mr-2"
          id={ index }
        />
        <label htmlFor={ index }>
          { `${item}: ${measures[index]}`}
        </label>
      </li>
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
          data-testid="favorite-btn"
          type="button"
          className="btn"
          onClick={ () => saveFavorite(recipeId, pathname) }
        >
          <img src={ isFavorite ? blackHeartIcon : whiteHeartIcon } alt="favorite" />
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
