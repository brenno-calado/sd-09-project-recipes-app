import React, { useState } from 'react';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function RecipeInProgress() {
  const [favorite, setFavorite] = useState(false);

  function handleClick() {
    setFavorite(!favorite);
  }

  return (
    <div>
      <img data-testid="recipe-photo" src="#" alt="Imagem da receita" />
      <h2 data-testid="recipe-title">Titulo</h2>
      <button data-testid="share-btn" type="button">
        <img src={ shareIcon } alt="Compartilhar" />
      </button>
      <button
        data-testid="share-btn"
        type="button"
        onClick={ handleClick }
      >
        <img src={ favorite ? blackHeartIcon : whiteHeartIcon } alt="Favoritar" />

      </button>
    </div>
  );
}

// O botão de favoritar deve possuir o atributo data-testid="favorite-btn";
// O texto da categoria deve possuir o atributo data-testid="recipe-category";
// Os ingredientes devem possuir o atributo data-testid=${index}-ingredient-step, a verificação será feita pelo length do atributo.
// O elemento de instruções deve possuir o atributo data-testid="instructions";
// O botão para finalizar a receita deve possuir o atributo data-testid="finish-recipe-btn".

export default RecipeInProgress;
