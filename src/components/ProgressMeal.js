import React, { useContext } from 'react';
import { MyContext } from '../MyContext';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function EmProgresso() {
  const { data, getKeysIngredints } = useContext(MyContext);

  /*
   imagem: strMealThumb,
   titulo: strMeal,
   categoria: strCategory
  */
  const { ingredients, measures } = getKeysIngredints();
  const renderList = () => (
    ingredients.map((item, index) => (
      <li key={ item }>
        <input type="checkbox" className="mr-2" />
        { `${item}: ${measures[index]}` }
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
      <ul className="list-unstyled ml-2">
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

export default EmProgresso;
