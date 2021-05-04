import React, { useContext } from 'react';
import { MyContext } from '../MyContext';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function EmProgresso() {
  const { filterIngredients } = useContext(MyContext);

  const data = JSON.parse(localStorage.getItem('data'));

  /*
   imagem: strMealThumb,
   titulo: strMeal,
   categoria: strCategory
   */
  const ingredientsList = filterIngredients(data);

  function renderList(list) {
    return (
      list.map((item, index) => (
        <li
          key={ item }
          data-testid={ `${index}-ingredient-step` }
        >
          <input type="checkbox" />
          { item }
        </li>
      ))
    );
  }

  return (

    <div>
      <img
        src={ data.strMealThumb }
        alt={ data.strMeal }
        data-testid="recipe-photo"
        className="img-thumbnail img-fluid"
      />
      <div className="d-flex">
        <h1 data-testid="recipe-title">{ data.strMeal }</h1>
        <button
          data-testid="share-btn"
          type="button"
          className="btn"
        >
          <img src={ shareIcon } alt="shareIcon" />
        </button>
        <button
          data-testid="favorite-btn"
          type="button"
          className="btn"
        >
          <img src={ whiteHeartIcon } alt="favorite" />
        </button>
      </div>
      <h2 data-testid="recipe-category">{ data.strCategory }</h2>
      <ul>
        {renderList(ingredientsList)}
      </ul>
      <p data-testid="instructions">{ data.strInstructions }</p>
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

export default EmProgresso;
