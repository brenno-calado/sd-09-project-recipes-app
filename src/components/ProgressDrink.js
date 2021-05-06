import React, { useContext } from 'react';
import { useLocation } from 'react-router';
import { MyContext } from '../MyContext';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import ShareButton from './ShareButton';

function ProgressDrink() {
  const {
    data,
    getKeysIngredints,
    isFavorite,
    saveFavorite,
    setIsFavorite,
  } = useContext(MyContext);

  const { pathname } = useLocation();
  const recipeId = pathname.split('/')[2];

  const getFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const initialFavoriteState = getFavorite.some((recipe) => recipe.id === recipeId);
  setIsFavorite(initialFavoriteState);

  /*
   imagem: strDrinkThumb,
   titulo: strDrink,
   categoria: strCategory
   Alcoolica: strAlcoholic
  */

  const { ingredients, measures } = getKeysIngredints();
  const renderList = () => (
    ingredients.map((item, index) => (
      <li
        key={ item }
        data-testid={ `${index}-ingredient-step` }
        className="list-group-item"
      >
        <input type="checkbox" className="mr-2" id={ index } />
        <label htmlFor={ index }>
          { `${item}: ${measures[index]}`}
        </label>
      </li>
    ))
  );

  return (
    <div className="container">
      <img
        src={ data.strDrinkThumb }
        alt={ data.strDrink }
        data-testid="recipe-photo"
        className="img-thumbnail img-fluid"
      />
      <div className="d-flex">
        <h1 data-testid="recipe-title">{ data.strDrink }</h1>
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

export default ProgressDrink;
